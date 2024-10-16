// seedAdmin.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'new.admin@example.com' });

    if (adminExists) {
      console.log('Admin user already exists.');
    } else {
      // Create admin user
      const admin = new User({
        "name": "New Admin",
        "email": "new.admin@example.com",
        "password": "newAdminPassword123",
        "customURL": "newadmin"
      });

      await admin.save();
      console.log('Admin user created successfully.');
    }

    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

createAdmin();
