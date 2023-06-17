const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Register a new user
async function register(req, res) {
  try {
    const { firstName, lastName, email, mobile, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const existingphonenumber = await User.findOne({ mobile });
    if (existingphonenumber) {
      return res.status(409).json({ message: 'phonenumber already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = new User({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    // Return a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
}

// Login a user
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JSON Web Token (JWT)
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY,);
    const { password: hashedPassword, ...others } = user._doc;
    // Return the token
    res.status(200).json({ token , ...others });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
}

module.exports = { register, login };
