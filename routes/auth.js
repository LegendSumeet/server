const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const { getAllReviews } = require('../controllers/reviewcontroller');
const mentorcontroller = require("../controllers/mentorcontroller");

// Register a new user
router.post('/register', authController.register);

// Login a user
router.post('/login', authController.login);


router.get('/reviews', getAllReviews);
router.get("/mentor/profile/:id",mentorcontroller.getMentorProfile)
module.exports = router;

