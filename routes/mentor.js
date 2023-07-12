const router = require("express").Router();
const mentorcontroller = require("../controllers/mentorcontroller");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin,verifyTokenAndmentor, verifyToken} = require("../middleware/verifyToken");
const { createRequest, getTimeRequestsByMentor ,cancelTimeRequest,acceptTimeRequest,get} = require('../controllers/requestController');
const { createRating,getMentorReviews } = require('../controllers/reviewcontroller');
const {  createCategory,getAllCategories,} = require('../controllers/categorycontroller');
const { mentorlogin } = require("../controllers/authcontroller");

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


module.exports = router;
 