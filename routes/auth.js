const router = require("express").Router();
const authController = require("../controllers/authcontroller")




router.post("/register", authController.createuser);

router.post("/login", authController.loginUser);

router.post("/registermentor", authController.creatementor);

router.post("/loginmentor", authController.loginMentor);


module.exports = router