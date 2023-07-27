const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/chat");


module.exports = {
  getAllMessages: async (req, res) => {
    try {

      const pageSize = 12;
      const page = req.query.page || 1;
      const skipMessages = (page - 1) * pageSize;

      var messages = await Message.find({ chat: req.params.id })
        .populate('sender', 'firstname email')
        .populate('chat')
        .sort({ createdAt: -1 })
        .skip(skipMessages)
        .limit(pageSize);
      messages = await User.populate(messages, {
        path: 'chat.users',
        select: 'firstname email'
      })
      res.json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching messages' });
    }
  },

  sendMessage: async (req, res) => {
    const { chatId, content, receiver } = req.body;
  
    if (!content || !chatId) {
      return res.status(400).json({ error: 'Content or chatId is missing' });
    }
  
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
  
    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
      receiver: receiver
    };
  
    try {
      // Create the message and get the Mongoose document
      let message = await Message.create(newMessage);
  
      // Populate sender's information (firstname, email)
      message = await Message.populate(message, { path: 'sender', select: 'firstname email' });
  
      // Populate chat information
      message = await Message.populate(message, { path: 'chat' });
  
      // Populate chat's users information
      message = await User.populate(message, {
        path: 'chat.users',
        select: 'firstname email'
      });
  
      // Update the latestMessage field in the Chat document
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'An error occurred while sending the message' });
    }
  }
  
  

}


