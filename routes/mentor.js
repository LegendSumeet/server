const router = require("express").Router();
const mentorcontroller = require("../controllers/mentorcontroller");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin,verifyTokenAndmentor, verifyToken} = require("../middleware/verifyToken");
const { createRequest, getUserRequests, cancelRequest, acceptRequest } = require('../controllers/request');



router.post("/creatementor", verifyTokenAndAuthorization, mentorcontroller.registerMentor);

router.get("/getall", mentorcontroller.getAllMentors);

router.put("/:id", verifyToken, mentorcontroller.updateMentor);
router.get("/:id", mentorcontroller.getmentor);

router.post("/:id/reviews",verifyToken, mentorcontroller.createReview);

router.get("/mentors", mentorcontroller.filtermentor);

router.post('/users/:userId/requests', createRequest);
router.put('/users/requests/:requestId/cancel', cancelRequest);
   
router.post('/mentors/:mentorId/requests/:requestId/accept',acceptRequest );
/*
router.delete("/:id", verifyTokenAndAdmin, mentorcontroller.deletementor);

router.get("/:id", mentorcontroller.getmentor);



router.get("/search/:key", mentorcontroller.searchmentor)

*/


module.exports = router;
 