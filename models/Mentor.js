const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  isMentor: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
  },
  location: {
    type: String,
  },
  perHourCharges: {
    type: String,
  },
  availability: {
    type: String,
  },
  currentWorkingat: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  otherProfile: {
    type: String,
  },
  description: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
}, { timestamps: true });

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = { Mentor, mentorSchema };
