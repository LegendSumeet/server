const { Double } = require('bson');
const mongoose = require('mongoose');
const { double } = require('webidl-conversions');

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
  confirmslotavail:{
    type: Boolean,
    default: false
  },
  seekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seekeremail:{
    type: String,
  },
  mentoremail:{
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'inprogress','SessionDone','completed'],
    default: 'pending'
  },
  price: {
    type: Number,
    required: true
  },
  mode:{
    type: String,
    required: true
  }
}, { timestamps: true });

const TimeRequest = mongoose.model('TimeRequest', timeRequestSchema);

module.exports = TimeRequest;
