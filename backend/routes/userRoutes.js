const express = require('express');
const router  = express.Router();
const userController = require('../controllers/userController');

/**
 * User Routes
 * Base path: /api/users
 */
router.post('/register', userController.register);
router.post('/login',    userController.login);
router.get('/me',        userController.getProfile); // protect later

module.exports = router;
