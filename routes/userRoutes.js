const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/me', userController.getCurrentUser);
router.get('/search', userController.searchUsers);

module.exports = router;