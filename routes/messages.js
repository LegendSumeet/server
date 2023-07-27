const router = require("express").Router();
const { Router } = require("express");

const messagecontroller = require("../controllers/messageController");

//send message
router.post("/",messagecontroller.sendMessage);

//get all messages
router.get("/:chatId",messagecontroller.getAllMessages);

//router.get("/:id",)



module.exports = router;
 