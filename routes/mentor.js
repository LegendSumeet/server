const router = require("express").Router();
const mentorcontroller = require("../controllers/mentorcontroller");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin,verifyTokenAndmentor, verifyToken} = require("../middleware/verifyToken");



router.post("/creatementor", verifyTokenAndAuthorization, mentorcontroller.registerMentor);

router.get("/getall", mentorcontroller.getAllMentors);

router.put("/:id", verifyToken, mentorcontroller.updateMentor);
/*
router.delete("/:id", verifyTokenAndAdmin, mentorcontroller.deletementor);

router.get("/:id", mentorcontroller.getmentor);



router.get("/search/:key", mentorcontroller.searchmentor)

*/


module.exports = router;
 