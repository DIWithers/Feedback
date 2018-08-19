require('./models/User');
require('./services/passport');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);
billingRoutes(app);



mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
