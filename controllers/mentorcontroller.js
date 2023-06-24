const { Mentor } = require('../models/Mentor');

const registerMentor = async (req, res) => {
  const {
    isMentor,
    category,
    location,
    education,
    perHourCharges,
    availability,
    currentWorkingat,
    linkedin,
    instgram,
    facebook,
    companyName,
    modeofcommunication,
    otherProfile,
    description,
    reviews,
    userId,
    firstName,
    lastName,
    email,
    mobile,
  } = req.body;
  const newMentor = new Mentor({
    isMentor,
    category,
    location,
    education,
    perHourCharges,
    availability,
    currentWorkingat,
    linkedin,
    instgram,
    facebook,
    companyName,
    otherProfile,
    modeofcommunication,
    description,
    reviews,
    userId,
    firstName,
    lastName,
    email,
    mobile,
  });

  try {

    const savedMentor = await newMentor.save();


    const { __v, createdAt, updatedAt, ...mentorInfo } = savedMentor._doc;

    res.status(201).json(mentorInfo);
  } catch (err) {
    res.status(500).json(err);
  }
};


const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


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
  try {
    const mentor = await Mentor.findById(req.params.id);
    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const createReview = async (req, res) => {

  
  // POST /mentors/:id/reviews

    try {
      const { id } = req.params;
      const { userId, review, rating } = req.body;
  
      // Find the mentor by id
      const mentor = await Mentor.findById(id);
  
      if (!mentor) {
        return res.status(404).json({ error: 'Mentor not found' });
      }
  
      // Check if the user has already reviewed the mentor
      const existingReviewIndex = mentor.reviews.findIndex(
        (review) => review.userId === userId
      );
  
      if (existingReviewIndex !== -1) {
        // Update the existing review
        mentor.reviews[existingReviewIndex].review = review;
        mentor.reviews[existingReviewIndex].rating = rating;
      } else {
        // Create a new review
        mentor.reviews.push({ userId, review, rating });
      }
  
      // Save the updated mentor with the new review
      const updatedMentor = await mentor.save();
  
      res.status(200).json(updatedMentor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

};

filtermentor = async (req, res) => {
  try {
    const { category } = req.query;

    let mentors;
    if (category) {
      // Filter mentors by category if category is provided
      mentors = await Mentor.find({ category });
    } else {
      // Fetch all mentors if no category is provided
      mentors = await Mentor.find();
    }

    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  registerMentor,
  getmentor,
  getAllMentors,
  updateMentor,
  createReview,
  filtermentor
};
