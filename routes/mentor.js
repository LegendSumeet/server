const router = require("express").Router();

const mentorcontroller = require("../controllers/mentorcontroller");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin,verifyTokenAndmentor} = require("../middleware/verifyToken");



router.post("/", verifyTokenAndmentor, mentorcontroller.creatementor);

router.put("/:id", verifyTokenAndmentor, mentorcontroller.updatementor);



router.delete("/:id", verifyTokenAndAdmin, mentorcontroller.deletementor);

router.get("/:id", mentorcontroller.getmentor);

router.get("/", mentorcontroller.getAllmentor);

router.get("/search/:key", mentorcontroller.searchmentor)




module.exports = router;
 