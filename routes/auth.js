const router = require("express").Router();
const authController = require("../controllers/authcontroller")


// REGISTRATION 

router.post("/register", authController.createuser);

router.post("/login", authController.loginUser);





module.exports = router