const { Mentor } = require('../models/Mentor');

const registerMentor = async (req, res) => {
  const {
    name,
    profile,
    profile1,
    profile2,
    companyname,
    education,
    country,
    category,
    sessionprice,
    sessiontime,
    ratings,
    userId,
    firstName,
    lastName,
    email,
    mobile,
  } = req.body;

  // Create a new Mentor instance
  const newMentor = new Mentor({
    name,
    profile,
    profile1,
    profile2,
    companyname,
    education,
    country,
    category,
    sessionprice,
    sessiontime,
    ratings,
    userId,
    firstName,
    lastName,
    email,
    mobile,
  });

  try {
    // Save the mentor to the database
    const savedMentor = await newMentor.save();

    // Exclude unnecessary fields from the response
    const { __v, createdAt, updatedAt, ...mentorInfo } = savedMentor._doc;

    res.status(201).json(mentorInfo);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Get all mentors
const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a mentor
const updateMentor = async (req, res) => {
  const { mentorId } = req.userId;
  const updateData = req.body;

  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, updateData, { new: true });
    res.status(200).json(updatedMentor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  registerMentor,
  getAllMentors,
  updateMentor,
};

