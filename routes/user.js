const router = require("express").Router();
const { Router } = require("express");
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin, verifyToken} = require("../middleware/verifyToken");



router.put("/", verifyToken, userController.updateUser);

router.delete("/", verifyToken, userController.deleteUser);

router.get("/", verifyToken,userController.getUser);





module.exports = router;
 