const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const mentorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    required: true,
    type: String,
    trim: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: true,
    type: String,
  },
  isMentor: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  profile: {
    type: String,
    required: true,
  },
  profile1: {
    type: String,
  },
  profile2: {
    type: String,
  },
  companyname: {
    type: String,
    required: true,
    trim: true,
  },
  education: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sessionprice: {
    type: String,
  },
  sessiontime: {
    type: String,
  },
  amount: {
    type: String,
  },
  ratings: [ratingSchema],
}, { timestamps: true }

);

const Mentor = mongoose.model("mentor", mentorSchema);

module.exports = { Mentor, mentorSchema };
