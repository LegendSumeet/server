const  Message  = require("../models/Message");
const User = require("../models/User");
const  Chat  = require("../models/chat");


module.exports = {
    getAllMessages : async (req, res) => {
        try {
          const { chatId } = req.params;
          const pageSize = 12;
          const page = req.query.page || 1;
          const skipMessages = (page - 1) * pageSize;
      
          const messages = await Message.find({ chat: chatId })
            .populate('sender', 'username profile email')
            .sort({ createdAt: -1 })
            .skip(skipMessages)
            .limit(pageSize);
      
          res.json(messages);
        } catch (error) {
          res.status(500).json({ error: 'An error occurred while fetching messages' });
        }
      },
      
      sendMessage :async (req, res) => {
        try {
          const { sender, content, chatId } = req.body;
          
         
          const chat = await Chat.findById(chatId);
          if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
          }
      
          const newMessage = new Message({ sender, content, chat: chatId });
          await newMessage.save();
          
          // Update the latest message in the chat
          chat.latestMessage = newMessage;
          await chat.save();
      
          res.status(200).json({ message: 'Message sent successfully', newMessage });
        } catch (error) {
            console.log(error);
          res.status(500).json({ error: 'An error occurred while sending the message' });
        }
    
    }
    
}
