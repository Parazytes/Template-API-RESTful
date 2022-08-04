const express = require('express');
const router = require('./routers');
const ApiError = require('./errors/apiError');
const apidocs = require('./helpers/apidocs');
const errorHandler = require('./helpers/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

apidocs(app);

app.use(router);

app.use((req, res, next) => {
    next(new ApiError('endpoint not found', { statusCode: 404 }));
});

app.use(errorHandler);

module.exports = app;
