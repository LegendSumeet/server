const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { Mentor } = require("../models/Mentor");

module.exports = {
  createuser: async (req, res) => {
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });

    try {
      const existingEmailUser = await User.findOne({ email: newUser.email });
      const existingPhoneUser = await User.findOne({ phonenumber: newUser.phonenumber });
      
        console.log(newUser.phonenumber);
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
      },
      
      creatementor: async (req, res) => {
        const newMentor = new Mentor({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phonenumber: req.body.phonenumber,
          email: req.body.email,
          password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
          name: req.body.name,
          profile: req.body.profile,
          profile1: req.body.profile1,
          profile2: req.body.profile2,
          companyname: req.body.companyname,
          education: req.body.education,
          country: req.body.country,
          category: req.body.category,
          sessionprice: req.body.sessionprice,
          sessiontime: req.body.sessiontime,
          amount: req.body.amount,
        });

        try {
          const existingEmailMentor = await Mentor.findOne({ email: newMentor.email });
          const existingPhoneMentor = await Mentor.findOne({ phonenumber: newMentor.phonenumber });
      
          if (existingEmailMentor) {
            return res.status(409).json("Email already exists");
          }
      
          if (existingPhoneMentor) {
            return res.status(409).json("Phone number already exists");
          }
      
          const savedMentor = await newMentor.save();
          res.status(201).json(savedMentor);
        }
        catch (error) {
          console.error("Error occurred during mentor creation:", error);
          res.status(500).json("Error occurred during mentor creation");
        }
      },


      loginMentor: async (req, res) => {
        try {
          const { email, password } = req.body;
          const mentor = await Mentor.findOne({ email });
      
          if (!mentor) {
            return res.status(401).json("Wrong login details");
          }
      
          const decryptedpass = CryptoJS.AES.decrypt(mentor.password, process.env.SECRET_KEY);
          const depassword = decryptedpass.toString(CryptoJS.enc.Utf8);
      
          if (depassword !== password) {
            return res.status(401).json("Wrong password");
          }
      
          const { password: _, __v, createdAt, ...others } = mentor._doc;
      
          const userToken = jwt.sign(
            { id: mentor._id, isAdmin: mentor.isAdmin, isMentor: mentor.isMentor },
            process.env.SECRET_KEY,
            { expiresIn: "21d" }
          );
      
          return res.status(200).json({ ...others, userToken });
        } catch (error) {
          console.error(error); // Log the specific error for debugging purposes
          return res.status(500).json("Internal server error");
        }
      },




          

}