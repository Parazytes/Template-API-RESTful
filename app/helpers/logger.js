const bunyan = require('bunyan');

const streams = [{
    level: 'error', // C'est le niveau à partir duquel il s'occupera des messages
    path: './log/error.log',
    type: 'rotating-file',
    period: '1d', // daily rotation // for test use 10000ms
    count: 3, // keep 3 back copies
}];

//* Affichage des message en console lors du dev
if (process.env.NODE_ENV !== 'production') {
    streams.push({
        level: 'info',
        stream: process.stdout,
    });
}

module.exports = bunyan.createLogger({
    name: 'template', //! Indiquer le nom de l'app
    streams,
});
