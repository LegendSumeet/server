const mongoose = require('mongoose');

const timeRequestSchema = new mongoose.Schema({
  timeInMinutes: {
    type: Number,
    required: true
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  seekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'inprogress'],
    default: 'pending'
  },
  price: {
    type: Number,
    required: true
  },
  mode:{
    type: String,
  }
}, { timestamps: true });

const TimeRequest = mongoose.model('TimeRequest', timeRequestSchema);

module.exports = TimeRequest;
