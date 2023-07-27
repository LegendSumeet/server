const router = require("express").Router();
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin,verifyTokenAndmentor, verifyToken} = require("../middleware/verifyToken");
const chatcontroller = require("../controllers/chatcontroller");

router.post("/",verifyTokenAndAuthorization,chatcontroller.createChat);

//get all messages
router.get("/",verifyTokenAndAuthorization,chatcontroller.getChat);




module.exports = router;
 