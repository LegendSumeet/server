const router = require("express").Router();
const { Router } = require("express");

const chatcontroller = require("../controllers/chatcontroller");

//send message
router.post("/",chatcontroller.createChat);

//get all messages
router.get("/:chatId",chatcontroller.getChat);




module.exports = router;
 