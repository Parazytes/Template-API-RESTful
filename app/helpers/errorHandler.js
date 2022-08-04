const logger = require('./logger');

module.exports = (err, req, res, next) => {
    logger.error(err);

    let statusCode;
    let message;

    if (err.name === 'ApiError') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.message;
    }
    //! Enchainer les erreurs possible
    // else if(){

    // }
    res.status(statusCode).json({ error: message });
};
