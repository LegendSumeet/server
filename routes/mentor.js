const router = require("express").Router();
const mentorcontroller = require("../controllers/mentorcontroller");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin,verifyTokenAndmentor, verifyToken} = require("../middleware/verifyToken");
const { createRequest, getTimeRequestsByMentor ,cancelTimeRequest,acceptTimeRequest,getTimeRequestsByUser} = require('../controllers/requestController');
const { createRating,getMentorReviews , getAllReviews  } = require('../controllers/reviewcontroller');
const reviewsall = require('../controllers/reviewcontroller');
const {  createCategory,getAllCategories,} = require('../controllers/categorycontroller');
const { mentorlogin } = require("../controllers/authcontroller");
const slotscontroller = require("../controllers/slotController");

//auth
router.post("/login", mentorlogin);

//mentor
router.post("/creatementor", mentorcontroller.registerMentor);
router.get("/getall", mentorcontroller.getAllMentors);
router.put("/:id", verifyToken, mentorcontroller.updateMentor);
router.get("/:id", mentorcontroller.getmentor);
router.get("/filter/:category", mentorcontroller.getMentorsByCategory);

//time request
router.post('/createrequest', createRequest);
router.get('/:mentorId/time-requests', getTimeRequestsByMentor);
router.delete('/:mentorId/time-requests/:requestId/cancel', cancelTimeRequest);
router.put('/:mentorId/time-requests/:requestId/accept', acceptTimeRequest);

//review
router.post('/review', createRating);
router.get('/:mentorId/reviews', getMentorReviews);



//category
router.post('/Createcategory', createCategory);
router.get('/getallcategories', getAllCategories);


//slots
router.post('/createslots', slotscontroller.createSlots);
router.get('/slots/:userID/:mentorID/:requestID', slotscontroller.getSlotsByUserAndMentorId);
router.post('/slots/confirm', slotscontroller.confirmSlot);
router.get('/slots/available/:userID/:mentorID/:requestID', slotscontroller.areMentorSlotsAvailableForUser);
router.get('/slots/userconfirmed/:requestID',slotscontroller.confirmedSlottomentor)


module.exports = router;
 