const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
      maxlength: [100, 'Job title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      trim: true,
    },
    skillsRequired: {
      type: [String],
      required: [true, 'Please specify required skills'],
    },
    location: {
      type: String,
      default: 'Remote',
    },
    budget: {
      type: Number,
      required: [true, 'Please specify a budget'],
    },
    timeline: {
      type: String,
      required: [true, 'Please specify a timeline'],
    },
    attachments: {
      type: [String], // URLs or file paths
      default: [],
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'in-progress', 'completed'],
      default: 'open',
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to update status based on applicants
jobSchema.pre('save', function (next) {
  if (this.applicants.length > 0 && this.status === 'open') {
    this.status = 'in-progress';
  }
  next();
});

module.exports = mongoose.model('Job', jobSchema);
