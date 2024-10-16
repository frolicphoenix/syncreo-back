// routes/admin.js

const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all users (Admin only)
router.get('/users', protect, authorize('admin'), getAllUsers);

module.exports = router;
