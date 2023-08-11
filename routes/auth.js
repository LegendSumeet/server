const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const { getAllReviews } = require('../controllers/reviewcontroller');

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);


router.get('/reviews', getAllReviews);
module.exports = router;

