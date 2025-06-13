const express=require("express");
const router=express.Router();
const postController=require("../controllers/postController");
const protect=require("../middlewares/authMiddleware");

router.post("/",protect,postController.createPost);
router.get("/",postController.getAllPosts);
router.put("/:id",protect,postController.updatePost);
router.delete("/:id",protect,postController.deletePost);
router.get("/search", postController.searchPosts);

module.exports=router;