const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const mentorSchema = new mongoose.Schema({
  isMentor: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
   
    
  },
  profile: {
    type: String,
  
  },
  profile1: {
    type: String,
  },
  profile2: {
    type: String,
  },
  companyname: {
    type: String,
   
  },
  education: {
    type: String,
  
  },
  country: {
    type: String,
   
  },
  category: {
    type: String,
  
  },
  sessionprice: {
    type: String,
  },
  sessiontime: {
    type: String,
  },
  ratings: [ratingSchema],
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
