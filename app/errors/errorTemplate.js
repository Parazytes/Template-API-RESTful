module.exports = class toDefine extends Error {
    constructor(message, infos) {
        super(message);
        this.name = 'toDefine';
        this.infos = infos;
    }
};

//! Remplacer toDefine par le type d'erreur qu'on souhaite categoriser.
