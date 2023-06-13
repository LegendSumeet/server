const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { all } = require("../routes/user");

module.exports = {
  updateUser: async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      const { password, __v, createdAt, ...others } = updatedUser._doc;
      res.status(200).json({ ...others });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    }catch (error) {
      res.status(500).json(error);
  }
},
getUser: async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, __v, createdAt, ...others } = user._doc;
    res.status(200).json(others);

  }catch (error) {
    res.status(500).json(error);
}
},

getAllUser: async (req, res) => {
  try {
    const alluser = await User.find();
    
    res.status(200).json(alluser);

  }catch (error) {
    res.status(500).json(error);
}
}


  

};
