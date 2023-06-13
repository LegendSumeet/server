const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
const { verifyTokenAndAuthorization ,verifyTokenAndAdmin,verifyTokenAndmentor} = require("../middleware/verifyToken");



router.post("/", bookmarkController.createBookmark);
router.delete("/:id", verifyTokenAndAuthorization, bookmarkController.deleteBookmark);
router.get("/:userId", bookmarkController.getBookmarks);



module.exports = router