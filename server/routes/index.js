const express = require('express');
const routes = express.Router();
const authCheck = require('../middleware/auth-check');

/// Controllers import
const basicController = require('../controllers/basicController');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

/// Basic routes
routes.get('/', basicController.get);

/// User routes
// routes.post('/register', userController.register);
// routes.post('/login', userController.login);

/// Post routes
// routes.post('/newpost', authCheck, postController.post);
// routes.get('/posts', authCheck, postController.GetAll);

/// Delete routes
// routes.delete('/:userId', authCheck, deleteController.delete);

/// Comment routes
// routes.post('/comment', authCheck, commentController.post);



// TODO

// Auth
routes.post('/register', authController.register);
routes.post('/login', authController.login);
routes.post('/forgotPassword', authController.sendPasswordReset);
routes.post('/resetPassword/:token', authController.resetPassword);

// Post CRUD
routes.get('/posts', authCheck, postController.findAll);
routes.post('/posts', authCheck, postController.create);
routes.get('/posts/:id', authCheck, postController.findOne);
routes.put('/posts/:id', authCheck, postController.update);
routes.delete('/posts/:id', authCheck, postController.delete);
routes.post('/posts/:id/like', authCheck, postController.like);
routes.delete('/posts/:id/dislike', authCheck, postController.dislike);

// Comment CRUD
routes.get('/comments', authCheck, commentController.findAll);
routes.post('/comments', authCheck, commentController.create);
routes.get('/comments/:id', authCheck, commentController.findOne);
routes.put('/comments/:id', authCheck, commentController.update);
routes.delete('/comments/:id', authCheck, commentController.delete);


// User CRUD
routes.get('/users', authCheck, userController.findAll);
routes.post('/users', authCheck, userController.create);
routes.get('/users/:id', authCheck, userController.findOne);
routes.put('/users/:id', authCheck, userController.update);
routes.delete('/users/:id', authCheck, userController.delete);



module.exports = routes;
