const { Mentor } = require('../models/Mentor');

const registerMentor = async (req, res) => {
  const {
    isMentor,
    category,
    location,
    perHourCharges,
    availability,
    currentWorkingat,
    linkedin,
    companyName,
    otherProfile,
    description,
    ratings,
    userId,
    firstName,
    lastName,
    email,
    mobile,
  } = req.body;

  // Create a new Mentor instance
  const newMentor = new Mentor({
    isMentor,
    category,
    location,
    perHourCharges,
    availability,
    currentWorkingat,
    linkedin,
    companyName,
    otherProfile,
    description,
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
  const { mentorId } = req.params;
  const updateData = req.body;

  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, updateData, { new: true });
    res.status(200).json(updatedMentor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getmentor = async (req, res) => {
  try{
    const mentor = await Mentor.findById(req.params.id);
    res.status(200).json(mentor);
  }catch(error){
    res.status(500).json({ error: 'Internal server error' });
  }
}



module.exports = {
  registerMentor,
  getmentor,
  getAllMentors,
  updateMentor,
};
