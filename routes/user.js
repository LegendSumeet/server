const router = require("express").Router();
const { Router } = require("express");
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin} = require("../middleware/verifyToken");



router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);

router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

router.get("/:id", verifyTokenAndAuthorization,userController.getUser);

router.get("/", verifyTokenAndAdmin,userController.getAllUser);





module.exports = router;
 