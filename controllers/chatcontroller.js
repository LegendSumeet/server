const Chat = require("../models/chat");
const User = require("../models/User");

module.exports = {
  createChat: async (req, res) => {
    try {
      const { chatName, isGroupChat, user, mentor } = req.body;
      const chat = new Chat({ chatName, isGroupChat, user, mentor });
      await chat.save();
      res.status(201).json(chat);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the chat' });
    }
  },

  getChat: async (req, res) => {
    try {
      const chatId = req.params.id; 
      const chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
      res.status(200).json({ chat });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the chat' });
    }
  }
};
