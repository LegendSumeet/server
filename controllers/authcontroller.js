const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

module.exports = {
  createuser: async (req, res) => {
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      location: req.body.location,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });

    try {
      const existingEmailUser = await User.findOne({ email: newUser.email });
      const existingPhoneUser = await User.findOne({ phonenumber: newUser.phonenumber });

      if (existingEmailUser) {
        return res.status(409).json("Email already exists");
      }

      if (existingPhoneUser) {
        return res.status(409).json("Phone number already exists");
      }

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error occurred during user creation:", error);
      res.status(500).json("Error occurred during user creation");
    }
  },









    loginUser: async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
      
          if (!user) {
            return res.status(401).json("Wrong login details");
          }
      
          const decryptedpass = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
          const depassword = decryptedpass.toString(CryptoJS.enc.Utf8);
      
          if (depassword !== password) {
            return res.status(401).json("Wrong password");
          }
      
          const { password: _, __v, createdAt, ...others } = user._doc;
      
          const userToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin, isMentor: user.isMentor },
            process.env.SECRET_KEY,
            { expiresIn: "21d" }
          );
      
          return res.status(200).json({ ...others, userToken });
        } catch (error) {
          console.error(error); // Log the specific error for debugging purposes
          return res.status(500).json("Internal server error");
        }
      }
      


}