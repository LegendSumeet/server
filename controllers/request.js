const express = require('express');
const { Mentor } = require("../models/Mentor");
const User = require('../models/User');
const createRequest = async (req, res) => {
    try {
      const { userId } = req.params;
      const { mentorId, additionalDetails } = req.body;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const mentor = await Mentor.findById(mentorId);
  
      if (!mentor) {
        return res.status(404).json({ error: 'Mentor not found' });
      }
  
      const request = {
        mentorId: mentor._id,
        additionalDetails,
        status: 'pending',
      };
  
      user.requests.push(request);
      await user.save();
  
      const notification = {
        message: `You have received a new request from ${user.firstName} ${user.lastName}`,
        request: request._id,
      };
  
      mentor.notifications.push(notification);
      mentor.requests.push(request);
      await mentor.save();
  
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Cancel a request
const cancelRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const user = await User.findById(req.user.id);

    const request = user.requests.id(requestId);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    user.requests.pull(request);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptRequest = async (req, res) => {
    try {
      const { requestId } = req.params;
      const {mentorId} = req.params;
  
      const mentor = await Mentor.findById(mentorId);
  
      if (!mentor) {
        return res.status(404).json({ error: 'Mentor not found' });
      }
  
      const request = mentor.requests.find((req) => req._id.toString() === requestId);
  
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      const user = await User.findById(request.userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      request.status = 'accepted';
  
    
      const userRequest = user.requests.find((req) => req._id.toString() === requestId);
      if (userRequest) {
        userRequest.status = 'accepted';
      }
  
      await user.save();
      await mentor.save();
  
      res.status(200).json({ message: 'Request accepted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  



module.exports = {
    createRequest,
    acceptRequest,
    cancelRequest,
};
