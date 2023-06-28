const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {Mentor} = require('../models/Mentor');
require('dotenv').config();


async function register(req, res) {
  try {
    const { firstName, lastName, email, mobile, password } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const existingphonenumber = await User.findOne({ mobile });
    if (existingphonenumber) {
      return res.status(409).json({ message: 'phonenumber already exists' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = new User({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword
    });


    await user.save();


    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY,);
    const { password: hashedPassword, ...others } = user._doc;

    res.status(200).json({ token, ...others });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
}

async function mentorlogin(req, res) {
  try {
    const { email, password } = req.body;


    const mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const passwordMatch = await bcrypt.compare(password, mentor.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
   
    const { password: hashedPassword, ...others } = mentor._doc;

    res.status(200).json({ ...others });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred'  });
  }
}

module.exports = { register, login, mentorlogin };
