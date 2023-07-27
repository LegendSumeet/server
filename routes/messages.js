const router = require("express").Router();
const { Router } = require("express");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin,verifyTokenAndmentor, verifyToken} = require("../middleware/verifyToken");
const messagecontroller = require("../controllers/messageController");

//send message
router.post("/",verifyTokenAndAuthorization,messagecontroller.sendMessage);

//get all messages
router.get("/:id",verifyTokenAndAuthorization,messagecontroller.getAllMessages);





module.exports = router;
 