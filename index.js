require('./services/passport');
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
