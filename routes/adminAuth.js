// routes/adminAuth.js

const express = require('express');
const router = express.Router();
const { registerAdmin } = require('../controllers/adminAuthController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Register a new admin (Admin only)
router.post('/register-admin', protect, authorize('admin'), registerAdmin);

module.exports = router;
