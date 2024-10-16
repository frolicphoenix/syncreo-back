// controllers/freelancerController.js

const asyncHandler = require('express-async-handler');
const Proposal = require('../models/Proposal');

// @desc    Get proposals submitted by freelancer
// @route   GET /api/freelancer/proposals
// @access  Private/Freelancer
const getFreelancerProposals = asyncHandler(async (req, res) => {
  const proposals = await Proposal.find({ freelancer: req.user.id })
    .populate('job', 'title description')
    .populate('freelancer', 'name email');
  res.json(proposals);
});

module.exports = { getFreelancerProposals };
