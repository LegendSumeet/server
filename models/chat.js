const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    user:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      mentor:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor',
      },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  });

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
