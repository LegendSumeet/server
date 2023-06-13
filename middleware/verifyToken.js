const User = require("../models/User");
const jwt = require("jsonwebtoken");


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

const verifyTokenAndAuthorization = async (req, res, next) => {
  verifyToken(req, res, async () => {
    if (req.user.id === req.params.id) {
      next();

    }
    else {
      res.status(403).json("your are not allwoed")
    }
  });
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





module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
