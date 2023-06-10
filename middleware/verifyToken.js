const User = require("../models/User");
const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY, async (err, user) => {
            if (err) res.status(403).json("Token is not valid");
            req.user = user;
            console.log(User);
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated");
    }


};

const verifyTokenAndAuthorization = async (req, res, next) => {
    verifyToken(req, res, async () => {
      try {
        const user = await User.findById(req.user._id);
        if (!user) {
          return res.status(404).json("User not found");
        }
        if (req.user._id.toString() === user._id.toString() || req.user.isAdmin) {
          req.user = user;
          next();
        } else {
          res.status(403).json("You are not allowed to do that");
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  };






module.exports = { verifyToken, verifyTokenAndAuthorization };
