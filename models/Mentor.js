const mongoose = require("mongoose");
const ratingSchema = require("./rating");
const { requestSchema, notificationSchema } = require("./request");

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
  education: {
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
  instgram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  otherProfile: {
    type: String,
  },
  modeofcommunication: {
    type: String,
  },
  description: {
    type: String,
  },
  amountEarned: {
    type: Number,
    default: 0,
  },
  totalSessions: {
    type: Number,
    default: 0,
  },
  reviews: [ratingSchema], 
  requests: [requestSchema],
  notifications: [notificationSchema],
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
