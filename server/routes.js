const express = require('express');
const routes = express.Router();

/// Controllers import
const basicController = require('./controllers/basicController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');
const deleteController = require('./controllers/deleteController');



/// Basic routes
routes.get('/', basicController.get);

/// User routes
routes.post('/register', userController.register);
routes.post('/login', userController.login);

/// Post routes
routes.post('/newpost', postController.post);
routes.get('/posts', postController.GetAll);

/// Delete routes
routes.delete('/:userId', deleteController.delete);

/// Comment routes
routes.post('/comment', commentController.post);

module.exports = routes;