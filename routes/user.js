const router = require("express").Router();
const { Router } = require("express");
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin, verifyToken} = require("../middleware/verifyToken");
const { getTimeRequestsByUser } = require("../controllers/requestController");



router.put("/", verifyToken, userController.updateUser);

router.delete("/", verifyToken, userController.deleteUser);

router.get("/", verifyToken,userController.getUser);

router.get('/:seekerId/time-requests',getTimeRequestsByUser );



module.exports = router;
 