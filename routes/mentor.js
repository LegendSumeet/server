const router = require("express").Router();
const { Router } = require("express");
const mentorcontroller = require("../controllers/userController");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin,verifyTokenAndmentor} = require("../middleware/verifyToken");



router.post("/", verifyTokenAndmentor, mentorcontroller.creatementor);
router.put("/:id", verifyTokenAndmentor, mentorcontroller.updatementor);



router.delete("/:id", verifyTokenAndmentor, mentorcontroller.deletementor);

router.get("/:id", mentorcontroller.getmentor);

router.get("/", mentorcontroller.getAllmentor);

router.get("/search", mentorcontroller.searchmentor)




module.exports = router;
 