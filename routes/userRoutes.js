const express = require('express');

const userController = require('../controllers/userController');

const route = express.Router();

route.post('/user', userController.newUser);
route.post('/user/:userId/post', userController.newPost);
route.get('/user/:userId/post',userController.getPost);

module.exports = route;