require('dotenv').config('../.env');
const express = require('express');
const { notFoundHandler, errorHandler } = require('../error/error')

const app = express();

app.use(require('../middleware/middleware'));
app.use(require('./routes'));
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;