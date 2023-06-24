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
  
},{timestamps: true},
);

const User = mongoose.model('User', userSchema);

module.exports = User;
