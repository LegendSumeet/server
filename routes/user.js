const router = require("express").Router();
const { Router } = require("express");
const { createRating,getMentorReviews , getAllReviews  } = require('../controllers/reviewcontroller');
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin, verifyToken} = require("../middleware/verifyToken");
const { getTimeRequestsByUser } = require("../controllers/requestController");


//auth
router.put("/", verifyToken, userController.updateUser);
router.delete("/", verifyToken, userController.deleteUser);
router.get("/:id", verifyToken,userController.getUser);
//time request
router.get('/:seekerId/time-requests',getTimeRequestsByUser );
router.get('/getallreviewsmetnor', getAllReviews);



module.exports = router;
 