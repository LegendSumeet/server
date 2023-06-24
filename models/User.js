const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
  password: {
    type: String
  },
  requests: [
    {
      mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
      additionalDetails: {
        type: String,
      },
    },
  ],
  
  notifications: [
    {
      message: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  
},{timestamps: true},
);

const User = mongoose.model('User', userSchema);

module.exports = User;
