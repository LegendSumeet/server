const mongoose = require("mongoose");
const { mentor, mentorSchema } = require("./Mentor");

const userSchema = mongoose.Schema({
  firstname: {
    required: true,
    type: String,
    trim: true,
  },
  lastname: {
    required: true,
    type: String,
    trim: true,
  },
  phonenumber: {
    type: Number,
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
  location: {
    type: String,
  },
  Profile:{
    type: String,
  },
  isMentor: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
