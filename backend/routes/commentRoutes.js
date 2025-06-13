const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const protect = require("../middleware/authMiddleware");


router.post("/", protect, commentController.createComment);
router.get("/post/:postId", commentController.getCommentsByPost);
router.put("/:id", protect, commentController.updateComment);
router.delete("/:id", protect, commentController.deleteComment);
module.exports = router;
