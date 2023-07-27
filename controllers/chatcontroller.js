const Chat = require("../models/chat");
const User = require("../models/User");

module.exports = {
  createChat: async (req, res) => {

    const { userID } = req.body;

    if (!userID) {
      return res.status(400).json({ error: 'User ID is missing' });
    }
    var isCHat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: userID } } },
        { users: { $elemMatch: { $eq: req.user.id } } }
      ]
    }).populate("users", "--password")
      .populate("latestmessage");

    isCHat = await User.populate(isCHat, {
      path: "latestMessage.sender",
      select: "firstname email"
    })
    if (isCHat.length > 0) {
      return res.status(200).json(isCHat[0]);
    }
    else {
      var ChatData = {
        chatName: userID,
        isGroupChat: false,
        users: [
          req.user.id, userID
        ],



      };
    }

    try {
      const createddchat = await Chat.create(ChatData);
      const Fullchat = await Chat.findOne({ _id: createddchat._id }).populate(
        "users", "--password"
      );
      res.status(200).json(Fullchat);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while creating the chat' });
    }

  },



  getChat: async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
        .populate("users", "--password")
        .populate("groupAdmin", "--password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async results => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "firstname email"
          });
          res.status(200).json(results);
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching the chat' });
    }
  }

}

