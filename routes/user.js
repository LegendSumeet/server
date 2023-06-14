const router = require("express").Router();
const { Router } = require("express");
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin} = require("../middleware/verifyToken");



router.put("/", verifyTokenAndAuthorization, userController.updateUser);

router.delete("/", verifyTokenAndAuthorization, userController.deleteUser);

router.get("/", verifyTokenAndAuthorization,userController.getUser);





module.exports = router;
 