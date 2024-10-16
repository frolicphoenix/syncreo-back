// seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    // Create a new user
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'freelancer',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: '5 years in web development',
      certifications: ['Certified JavaScript Developer'],
      portfolio: ['https://portfolio.example.com/johndoe'],
      resume: 'https://resume.example.com/johndoe.pdf',
      customURL: 'johndoe',
    });

    await user.save();
    console.log('User created:', user);

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
