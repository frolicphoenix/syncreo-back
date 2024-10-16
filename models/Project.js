const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    milestones: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: '',
        },
        deadline: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          enum: ['pending', 'completed', 'approved'],
          default: 'pending',
        },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    files: {
      type: [String], // URLs or file paths
      default: [],
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    progress: {
      type: Number,
      default: 0, // Percentage
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

module.exports = mongoose.model('Project', projectSchema);
