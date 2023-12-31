const { Review } = require('../models/review');

const { Mentor } = require('../models/Mentor');

const User = require('../models/User');

const TimeRequest = require("../models/timeRequestSchema");

const createRating = async (req, res) => {
  try {
    const { userId, mentorId, rating, review, reqId } = req.body;

    const mentorExists = await Mentor.findById(mentorId);
    const userExists = await User.findById(userId);

    if (!mentorExists || !userExists) {
      return res.status(404).json({ error: 'Mentor or user not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const reviewBy = `${user.firstName} ${user.lastName}`;

    const newRating = new Review({
      userId,
      mentorId,
      reviewBy,
      rating,
      review,
    });
    await newRating.save();

    const ratings = await Review.find({ mentorId });
    const sum = ratings.reduce((total, rating) => total + rating.rating, 0);
    const avgRating = sum / ratings.length;

    newRating.avgrating = avgRating;
    await newRating.save();

    const mentor = await Mentor.findById(mentorId);
    mentor.avgrating = avgRating;
    await mentor.save();

    await TimeRequest.updateOne(
      { _id: reqId },
      { $set: { status: 'completed' } }
    );


    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMentorReviews = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    const ratings = await Review.find({ mentorId });

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllReviews = async (req, res) => {
  try {
    const ratings = await Review.find();
    res.status(200).json(ratings);
  } catch (error) {
    throw error;
  }
};




module.exports = {
  createRating,
  getMentorReviews,
  getAllReviews,
};







