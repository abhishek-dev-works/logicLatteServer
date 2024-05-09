// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Define routes for user controller
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/user/auth', userController.Authenticate);

module.exports = router;
