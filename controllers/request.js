const express = require('express');
const { Mentor } = require("../models/Mentor");
const User = require('../models/User');
const TimeRequest = require('../models/timeRequestSchema');

const createRequest = async (req, res) => {
  try {
    const { timeInMinutes, mentorId, seekerId, price } = req.body;

    // Check if the mentor and seeker exist
    const mentor = await Mentor.findById(mentorId);
    const seeker = await User.findById(seekerId);

    if (!mentor || !seeker) {
      return res.status(404).json({ error: 'Mentor or seeker not found' });
    }

    // Create a new time request
    const newRequest = new TimeRequest({
      timeInMinutes,
      mentorId,
      seekerId,
      price,
    });

    // Save the request
    await newRequest.save();

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTimeRequestsByMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const timeRequests = await TimeRequest.find({ mentorId });

    res.status(200).json(timeRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelTimeRequest = async (req, res) => {
  try {
    const { mentorId, requestId } = req.params;

    const timeRequest = await TimeRequest.findById(requestId);

    if (!timeRequest) {
      return res.status(404).json({ error: 'Time request not found' });
    }

    if (timeRequest.mentorId.toString() !== mentorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    timeRequest.status = 'rejected';
    await timeRequest.save();

    res.status(200).json({ message: 'Time request cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const acceptTimeRequest = async (req, res) => {
  try {
    const { mentorId, requestId } = req.params;

    const timeRequest = await TimeRequest.findById(requestId);

    if (!timeRequest) {
      return res.status(404).json({ error: 'Time request not found' });
    }

    if (timeRequest.mentorId.toString() !== mentorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    timeRequest.status = 'accepted';
    await timeRequest.save();

    res.status(200).json({ message: 'Time request accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = {
    createRequest,
    getTimeRequestsByMentor,
    cancelTimeRequest,
    acceptTimeRequest
};
