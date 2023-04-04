const User = require('../model/userModel');
const Post = require('../model/postModel');
var moment = require('moment');

// tạo một bài viết
const createPost = async (req, res) => {
    const { title, content, author, images, codeName } = req.body;
    try {
        const newPost = new Post({title, content, author, images, codeName});
        const post = await newPost.save();
        res.json({
            status: true,
            message: "Bài báo được tạo thành công.",
            data: post,
        })
    } catch (err) {
        res.status(500).json({ err});
    }
} 

// lấy 1 bài viết có id
const getPostId = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById({_id: postId}).populate("author", ["name", "avatar", "position"]);
        if (post) {
            return res.json({
                status: true,
                message: "Bài viết được tìm thấy.",
                data: post,
            })
        }
        res.json({
            status: false,
            message: "Bài viết không tồn tại.",
        })
    } catch (err) {
        res.status(500).json({ err});
    }
}

// lấy tất cả bài Viết
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({"createdAt": "desc"}).populate("author", ["name", "avatar", "position"]);
        res.json({
            status: true,
            message: 'Lấy dữ liệu thành công',
            data: posts,
        })
    } catch (err) {
        res.status(500).json({ err});
    }
}

// lấy bài Viết nhiều totalWatch nhất
const getPostsTotalWatch = async (req, res) => {
    try {
        const posts = await Post.find().sort({"totalWatch": "desc"}).limit(20).populate("author", ["name", "avatar", "position"]);
        res.json({
            status: true,
            message: 'Lấy dữ liệu thành công',
            data: posts,
        })
    } catch (err) {
        res.status(500).json({ err});
    }
}

// lấy bài Viết có codeName
const getPostsCodeName = async (req, res) => {
    const codeName = req.query.codeName;
    try {
        const posts = await Post.find({codeName: codeName}).populate("author", ["name", "avatar", "position"]);
        res.json({
            status: true,
            message: 'Lấy dữ liệu thành công',
            data: posts,
        })
    } catch (err) {
        res.status(500).json({ err});
    }
}

// lấy bài Viết của 1 user
const getPostsUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const posts = await Post.find({author: userId}).populate("author", ["name", "avatar", "position"]);
        res.json({
            status: true,
            message: 'Lấy dữ liệu thành công',
            data: posts,
        })
    } catch (err) {
        res.status(500).json({ err});
    }
}

// xóa bài Viết 
const deletePostsUser = async (req, res) => {
    const postId = req.params.postId;
    try {
        await Post.findByIdAndRemove({_id: postId});
        res.json({
            status: true,
            message: 'Bài báo đã được xóa thành công',
        })
    } catch (err) {
        res.status(500).json({ err});
    }
}

// cập nhật totalWatch của 1 bài viết
const updateTotalWatch = async (req, res) => { 
    const { postId, total } = req.body;
    try {
        const post1 = await Post.findByIdAndUpdate({_id: postId}, {totalWatch: total}, {new: true});
        res.json({
            status: true,
            data: post1,
        })
    } catch (err) {
        res.status(500).json({ err });
    }
}

module.exports = {
    createPost,
    updateTotalWatch,
    getAllPosts,
    getPostsTotalWatch,
    getPostsCodeName,
    getPostsUser,
    deletePostsUser,
    getPostId,
}