const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        const newPost = new Post({
            title,
            content,
            tags,
            author: req.user.id, // middleware sets req.user
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // ✅ typo fixed: `mesaage` → `message`
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;        // Default to page 1
        const limit = parseInt(req.query.limit) || 10;     // Default to 10 posts per page
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .sort({ createdAt: -1 }) // newest first
            .skip(skip)
            .limit(limit)
            .populate("author", "name email");

        const total = await Post.countDocuments();

        res.json({
            page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
            posts
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


exports.updatePost=async(req,res)=>{
    try{
        const post = await Post.findOne({ _id: req.params.id, author: req.user.id });   
        if (!post) {
            return res.status(404).json({ msg: "Post not found or unauthorized" });
        }

        const { title, content, tags } = req.body;
        if(title)post.title=title;
        if(content)post.content=content;
        if(tags)post.tags=tags;
        await post.save();

        res.json(post);
    }
    catch(error)
    {
        res.status(500).json({msg:error.message});
    }
};

exports.deletePost=async(req,res)=>{
    try{
        const post=await Post.findOne({_id:req.params.id,author:req.user.id});
        if (!post) {
            return res.status(404).json({ msg: "Post not found or unauthorized" });
        }
        await post.deleteOne();
        res.json({ msg: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.searchPosts = async (req, res) => {
    try {
        const { keyword } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { content: { $regex: keyword, $options: "i" } },
                { tags: { $regex: keyword, $options: "i" } }
            ]
        };

        const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("author", "name email");

        const total = await Post.countDocuments(query);

        res.json({
            page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
            posts
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
