// routes/freelancer.js

const express = require('express');
const router = express.Router();
const { getFreelancerProposals } = require('../controllers/freelancerController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get freelancer's proposals
router.get('/proposals', protect, authorize('freelancer'), getFreelancerProposals);

module.exports = router;
