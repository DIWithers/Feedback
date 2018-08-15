require('./services/passport');
require('./models/User');
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
authRoutes(app);

const keys = require('./config/keys');
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
