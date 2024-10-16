// routes/auth.js

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Registration Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// Get User Profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
