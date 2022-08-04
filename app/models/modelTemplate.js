const CoreDatamapper = require('./coreDatamapper');
const client = require('../clients/pg');

class ModelTemplate extends CoreDatamapper {
    tableName = '';
}

module.exports = new ModelTemplate(client);

//! Changer ModelTemplate par le Nom de la table
//! completer tableName par le nom de la table
