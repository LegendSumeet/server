const { Mentor } = require('../models/Mentor');
const User = require('../models/User');

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
    userId,
    avgrating,
  } = req.body;

  try {
 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    

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
      userId,
      avgrating,
      firstName: user.firstName,  
      lastName: user.lastName,   
      email: user.email,          
      password: user.password,
      mobile: user.mobile,        
    });

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

  
  

    try {
      const { id } = req.params;
      const { userId, review, rating } = req.body;
  
     
      const mentor = await Mentor.findById(id);
  
      if (!mentor) {
        return res.status(404).json({ error: 'Mentor not found' });
      }
  
     
      const existingReviewIndex = mentor.reviews.findIndex(
        (review) => review.userId === userId
      );
  
      if (existingReviewIndex !== -1) {
      
        mentor.reviews[existingReviewIndex].review = review;
        mentor.reviews[existingReviewIndex].rating = rating;
      } else {
      
        mentor.reviews.push({ userId, review, rating });
      }

      const updatedMentor = await mentor.save();
  
      res.status(200).json(updatedMentor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

};
const getMentorsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

   
    const mentors = await Mentor.find({ category });

    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerMentor,
  getmentor,
  getAllMentors,
  updateMentor,
  createReview,
  getMentorsByCategory
};
