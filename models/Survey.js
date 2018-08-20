const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');
const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [String]
});

mongoose.model('surveys', surveySchema);