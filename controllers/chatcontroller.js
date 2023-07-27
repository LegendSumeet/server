const  Chat  = require("../models/chat");
const User = require("../models/User");

module.exports = {

  createChat : async (req, res) => {
    try {
      const { chatName, isGroupChat, user , mentor} = req.body;
      const chat = new Chat({ chatName, isGroupChat, user , mentor });
      await chat.save();
      res.status(201).json({ message: 'Chat created successfully', chat });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the chat' });
    }
  },

}