# Template API Restful - node Express

## Résumé des différentes parties/couches de l'application


### Point d'entrée pour le lancement du serveur web

fichier concerné : [./index.js](./index.js)

Il ne se charge QUE tu lancement du serveur. Même la création de l'application est externalisé dans un module. Cela respecte la SoC. On injecte l'application dans une serveur http.

### Module de l'application

fichier concerné : [./app/index.js](./app/index.js)

C'est le fichier centrale qui organise les différents module applicatifs.

Ce qui est référencé à l'intérieur :

1. Les middleware d'interprétations de données entrantes (express.json() et express.urlencoded())
2. le routeur
3. Le middleware de 404
4. Le middleware de gestion d'erreurs

### Le module de routage

fichier concerné : [./app/routers/index.js](./app/routers/index.js)

C'est ici que l'on défini l'enchainement des middlewares devant répondre à une requête particulière.
Si jamais aucune route de correspond à la demande, celle-ci terlminera sa course dans le middleware de 404.

Pour chaque route défini:

- Authentification : Module externe .
- Validation de données : se charge de vérifier que les données (Joi & validation).
- ControllerHandler : se charge des `Try | catch` des controller [./app/helpers/controllerHandler.js](./app/helpers/controllerHandler.js)
- ControllerTemplate: Template d'un controller a remplir 

### Controller Template

fichier concerné : [./app/controllers/index.js](./app/controllers/controllerTemplate.js)

Son but est de : 

1. De récupérer les informations particulières envoyé par l'utilisateur dans la requête au serveur afin de potentiellment les utiliser ensuite.
2. De récupérer des données brutes nécessaires pour répondre à la demande de l'utilisateur.
3. Utiliser un service/couche métier afin d'appliquer une logique à notre réponse.
4. Répondre à l'utilisateur dans un formalisme particulier. En JSON avec une structure prédéfini (par exemple l'ajout d'une enveloppe (propriété) "data" pour renvoyer les données de réponse en même temps qu'une potentielle erreur que l'on associerai dans une enveloppe "error.

### Récupérations des données brutes (Models Template)

fichier concerné : [./app/models/index.js](./app/models/modelTemplate.js)

Le models sont des abstractions de données. C'est à dire que leur but est des livrer des données brutes de façon agnostique (qui n'a pas de lien direct avec une technique de stockage). Cela peut retrouné, par exemple des valeurs contenu dans un JSON ou dans une BDD.

Etendre la class des models avec coreDatamapper afin d'avoir acces aux methodes CRUD.

### Service/couche métier

fichier concerné : [./app/services/cadex.js](./app/services/serviceTemplate.js)

C'est la vrai valeur ajouter de notre application c'est la seule partie qui est différente du application à une autre.

C'est ici que sont concentrés les mécanismes/fonctionnements "intellectuels".

Il n'y a pas vraiment de règle d'implémentation ici, cela varie d'un métier à l'autre.

Dans tous les cas cela récupère des données brutes en entrée, et renvoi des données calculés en sortie.

## Les modules satellites


### Le gestionnaire de controller

fichier concerné : [./app/helpers/controllerHandler.js](./app/helpers/controllerHandler.js)

Il permet d'encapsuler (`try | catch`) tous les controller de l'application, afin de capturer les potentielles erreurs qui pourrait intervenir lors de la réponse à une requête.

Ce gestionnaire capturera les erreurs qui sont apparu dans (les models, les services ou le controller lui-même).

Cette implémentation permet de gérer toujours les erreurs de la même façon en les renvoyer toujours au même endroit avec un next qui atterira dans un middleware de gestion d'erreurs.

### Le middleware de gestion d'erreurs

fichier concerné : [./app/helpers/errorHandler.js](./app/helpers/errorHandler.js)

C'est ici que l'on va dispatcher la gestion des erreurs en fonction de leur type, afin de répondre dans un certain formalisme et en fournissant les détails de l'erreurs de façon clair et concises.

### Le "logger"

fichier concerné : [./app/helpers/logger.js](./app/helpers/logger.js)

Il permet de définir où et comment sont affichés/stockés les messages d'erreurs potentiels de l'application.
Ici ils sont stockés dans un/des fichiers de log pendant 1 jour.


### Les modules secondaires

Middleware qui se charge de l'affichage de la [documentation](./app/helpers/apidocs.js) de l'application.

Implémentation nos propres erreurs ["errors"](./app/errors/errorTemplate.js).