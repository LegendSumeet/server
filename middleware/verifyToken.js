const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      console.log(User);
      next();
    })
  } else {
    return res.status(401).json("You are not authenticated");
  }


};


const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, async () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that");
    }
  });
};

const verifyTokenAndmentor = (req, res, next) => {
  verifyTokenAndAuthorization(req, res, async () => {
    if (req.user.isMentor) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that");
    }
  });
};
module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyTokenAndmentor};
