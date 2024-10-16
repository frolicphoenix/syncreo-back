const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define roles
const roles = ['freelancer', 'client', 'admin'];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Exclude password from query results by default
    },
    role: {
      type: String,
      enum: roles,
      default: 'freelancer',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      default: '',
    },
    certifications: {
      type: [String],
      default: [],
    },
    portfolio: {
      type: [String], // URLs or file paths to portfolio items
      default: [],
    },
    resume: {
      type: String, // URL or file path to resume
      default: '',
    },
    customURL: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple nulls
      match: [/^[a-zA-Z0-9_-]{3,30}$/, 'URL must be 3-30 characters and valid'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Virtual field for number of jobs posted
userSchema.virtual('jobsPosted', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'client',
  count: true,
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ customURL: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('User', userSchema);
