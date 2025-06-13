const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
    try {
        const { content, post} = req.body;

        const newComment = new Comment({
            content,
            post,
            author: req.user.id, // middleware sets req.user
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // ✅ typo fixed: `mesaage` → `message`
    }
};


exports.getCommentsByPost = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate("author", "name email")
            .sort({ createdAt: -1 }); // Optional: newest first

        res.json(comments);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.updateComment=async(req,res)=>{
    try{
        const comment = await Comment.findOne({ _id: req.params.id, author: req.user.id });   
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found or unauthorized" });
        }

        const {content} = req.body;
        comment.content=content;
        
        await comment.save();

        res.json(comment);
    }
    catch(error)
    {
        res.status(500).json({msg:error.message});
    }
};

exports.deleteComment=async(req,res)=>{
    try{
        const comment=await Comment.findOne({_id:req.params.id,author:req.user.id});
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found or unauthorized" });
        }
        await comment.deleteOne();
        res.json({ msg: "Comment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
}