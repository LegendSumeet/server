const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);
router.get("/:id", verifyTokenAndAuthorization,userController.getUsers);



module.exports = router;
 