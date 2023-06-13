const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");



router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);





module.exports = router;
 