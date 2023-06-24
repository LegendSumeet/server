const router = require("express").Router();
const mentorcontroller = require("../controllers/mentorcontroller");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin,verifyTokenAndmentor, verifyToken} = require("../middleware/verifyToken");
const { createRequest, getTimeRequestsByMentor ,cancelTimeRequest,acceptTimeRequest} = require('../controllers/request');



router.post("/creatementor", mentorcontroller.registerMentor);
router.get("/getall", mentorcontroller.getAllMentors);
router.put("/:id", verifyToken, mentorcontroller.updateMentor);
router.get("/:id", mentorcontroller.getmentor);



router.post('/createrequest', createRequest);
router.get('/:mentorId/time-requests', getTimeRequestsByMentor);
router.delete('/:mentorId/time-requests/:requestId/cancel', cancelTimeRequest);
router.put('/:mentorId/time-requests/:requestId/accept', acceptTimeRequest)

/*
router.delete("/:id", verifyTokenAndAdmin, mentorcontroller.deletementor);

router.get("/:id", mentorcontroller.getmentor);



router.get("/search/:key", mentorcontroller.searchmentor)

*/


module.exports = router;
 