const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { get } = require("mongoose");

// Controller function for user registration
const registerUser = async (req, res) => {
  // Extract user registration data from the request body
  const { firstname, lastname, email, password, phonenumber } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phonenumber,
    });

    // Save the user to the database
    await user.save();

    // Generate a new JWT token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);



    res.status(200).json({ token , id: user._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for user login
const loginUser = async (req, res) => {
  // Extract user login data from the request body
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a new JWT token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.status(200).json({ token , id: user._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for updating a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user fields
    Object.assign(user, updates);

    // Save the updated user
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
}

getUsers = async (req, res) => {
    try{
        const users = await User.findById(req.params.id);

        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json(err);
    }
}

getALLUsers = async (req, res) => {
    try{
        const allusers = await User.find();

        res.status(200).json(allusers);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsers,
  getALLUsers
};
