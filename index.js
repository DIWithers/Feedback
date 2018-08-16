require('./models/User');
require('./services/passport');
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const mongoose = require('mongoose');
authRoutes(app);

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
