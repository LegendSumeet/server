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
  Availability: {
    type: String,
  },
  CurrentWorking: {
    type: String,
  },
  Linkedin: {
    type: String,
  },
  OtherProfile: {
    type: String,
  },
  Description: {
    type: String,
  },
  sessionprice: {
    type: String,
  },
  sessiontime: {
    type: String,
  },
  ratings: {
    type: String,
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
