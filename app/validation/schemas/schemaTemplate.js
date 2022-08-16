const Joi = require('joi');

const schema = Joi.object({
    //! Ici mettre les contraintes souhaité
    // ? Voir [https://joi.dev/api/?v=17.6.0]
    // * Pour le token d'auth preciser son type dans le schema:
    /*
    token: {type: String }
    */
});

module.exports = schema;
