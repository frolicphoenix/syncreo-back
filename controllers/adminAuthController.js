// controllers/adminAuthController.js

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const User = require('../models/User');
const validator = require('validator');

// @desc    Register a new admin user
// @route   POST /api/admin/register-admin
// @access  Private/Admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, customURL } = req.body;

  // Input validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error('Invalid email address');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  // Create admin user
  const admin = await User.create({
    name,
    email,
    password,
    role: 'admin',
    customURL,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  registerAdmin,
};
