const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverLetter: {
      type: String,
      required: [true, 'Please provide a cover letter'],
    },
    bidAmount: {
      type: Number,
      required: [true, 'Please provide a bid amount'],
    },
    deliveryTime: {
      type: String,
      required: [true, 'Please specify delivery time'],
    },
    status: {
      type: String,
      enum: ['submitted', 'accepted', 'rejected'],
      default: 'submitted',
    },
    proposalTemplate: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Proposal', proposalSchema);
