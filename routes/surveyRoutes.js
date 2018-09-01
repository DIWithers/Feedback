const mongoose = require('mongoose');
const Path = require('path-parser').default;
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');


module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey
            .find({ _user: req.user.id })
            .select({ recipients: false });
        res.send(surveys);
    });
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('<h1>Thanks for voting!!!</h1>');
    });
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title: title,
            subject: subject,
            body: body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user); // updates customer info in header
        }
        catch (error) {
            res.status(422).send(error);
        }

    });
    app.post('/api/surveys/webhooks', (req, res) => {
        console.log("!!!!!!!!______!!!!!!!!_________!!!!!!!");
        console.log(req.body);
        const pathVariableExtractor = new Path('/api/surveys/:surveyId/:choice');
        updateDBWithSelectedChoiceForFirstTimeRespondents(req, pathVariableExtractor);
        res.status(200).send('OK');
    });
};

function updateDBWithSelectedChoiceForFirstTimeRespondents(req, pathVariableExtractor) {
    getUniqueEvents(req, pathVariableExtractor)
        .forEach(({ surveyId, email, choice }) => {
            Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }
            ).exec();
        })
}
function getUniqueEvents(req, pathVariableExtractor) {
    return req.body
        .filter(event => event.email && event.url && event.event === 'click')
        .map(({ email, url }) => {
            const match = pathVariableExtractor.test(new URL(url).pathname);
            if (match)
                return { email, surveyId: match.surveyId, choice: match.choice };
        })
        .sort((e1, e2) => {
            const e1_sort_string = e1.email + e1.surveyId + e1.choice;
            const e2_sort_string = e2.email + e2.surveyId + e2.choice;
            if (e1_sort_string < e2_sort_string) {
                return -1;
            }
            return 1;
        })
        .reduce((acc, curr) => {
            if (acc.length === 0 || acc[acc.length - 1] !== curr) {
                acc.push(curr);
            }
            return acc;
        }, []);
}