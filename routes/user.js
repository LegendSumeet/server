const router = require("express").Router();
const { Router } = require("express");
const { createRating,getMentorReviews , getAllReviews  } = require('../controllers/reviewcontroller');
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin, verifyToken} = require("../middleware/verifyToken");
const { getTimeRequestsByUser } = require("../controllers/requestController");
const slotscontroller = require("../controllers/slotController")

//auth
router.put("/", verifyToken, userController.updateUser);
router.delete("/", verifyToken, userController.deleteUser);
router.get("/:id",userController.getUser);
//time request
router.get('/:seekerId/time-requests',getTimeRequestsByUser );

//check
router.get('/check/:userId',userController.MentorOrUser);
router.get('/cnflsots/:requestID',slotscontroller.confirmedSlottoUser)





module.exports = router;
 