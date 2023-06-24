const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  additionalDetails: {
    type: String,
  },
});

const notificationSchema = mongoose.Schema({
    _id:false,
    message: {
      type: String,
    },
  });

  module.exports = {requestSchema, notificationSchema};