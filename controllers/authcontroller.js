const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwtwebtoken = require("jsonwebtoken")

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
            const savedUser = await newUser.save();

            res.status(201).json(savedUser)
        } catch (error) {
            res.status(500).json(error);
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(401).json("wrong login details");

            const decryptedpass = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const depassword = decryptedpass.toString(CryptoJS.enc.Utf8);

            depassword != req.body.password && res.status(401).json("wrong password");
            const { password, __v, createdAt, ...others } = user._doc;

            const userToken = jwt.sign({
                id: user._id, isAdmin: user.isAdmin, isMentor: user.isMentor
            },
            process.env.SECRET_KEY, { expiresIn: "1d" }
            )



            res.status(200).json(...others);

        } catch (error) {
            res.status(500)
        }

    }


}