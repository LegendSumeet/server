const { Review } = require('../models/review');
const { Mentor } = require('../models/Mentor');
const User = require('../models/User');

const createRating = async (req, res) => {
    try {
        const { userId, mentorId, rating, review } = req.body;

        const mentorExists = await Mentor.findById(mentorId);
        const userExists = await User.findById(userId);

        if (!mentorExists || !userExists) {
            return res.status(404).json({ error: 'Mentor or user not found' });
        }

        const existingRating = await Review.findOne({ userId, mentorId });
        if (existingRating) {
            return res.status(400).json({ error: 'User has already reviewed this mentor' });
        }
        const newRating = new Review({
            userId,
            mentorId,
            rating,
            review,
        });
        await newRating.save();

        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getMentorReviews = async (req, res) => {
    try {
      const { mentorId } = req.params;
  
      // Find the mentor by mentorId
      const mentor = await Mentor.findById(mentorId);
  
      if (!mentor) {
        return res.status(404).json({ error: 'Mentor not found' });
      }
  
      // Find all the ratings for the mentor
      const ratings = await Review.find({ mentorId });
  
      res.status(200).json({ mentor, ratings });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports = {
    createRating,
    getMentorReviews,
};

