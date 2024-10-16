// controllers/adminController.js

const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

module.exports = { getAllUsers };
