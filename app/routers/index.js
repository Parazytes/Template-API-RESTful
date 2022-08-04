const express = require('express');

// ? Validation avec Joi
const schemaTemplate = require('../validation/schemas/schemaTemplate');
const validation = require('../validation/validator');

// ? Require des controllers
const { controllerTemplate } = require('../controllers');

// ? controllerHandler
const controllerHandler = require('../helpers/controllerHandler');

const router = express.Router();

//! Utiliser le controller adequat selon la route
router.route('/')
    // ? Recuperation
    .get(validation('query', schemaTemplate), controllerHandler(controllerTemplate))
    // ? Publication
    .post(validation('body', schemaTemplate), controllerHandler(controllerTemplate))
    // ? Update or Create
    .put(validation('body', schemaTemplate), controllerHandler(controllerTemplate))
    // ? Delete
    .delete(validation('query', schemaTemplate), controllerHandler(controllerTemplate));

module.exports = router;
