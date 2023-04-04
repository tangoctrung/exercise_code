const router = require('express').Router();
const { createPost, updateTotalWatch, getAllPosts,
    getPostsTotalWatch,
    getPostsCodeName,
    getPostsUser,
    deletePostsUser, getPostId } = require('../controller/postController');

const verifyToken = require('../middleware/auth');

// tạo một bài viết
router.post('/createpost', verifyToken, createPost);

// cập nhật totalWatch của 1 bài viết
router.put('/updatetotalwatch', updateTotalWatch);

// lấy tất cả bài viết
router.get('/getallposts', getAllPosts);

// lấy 1 bài viết có id
router.get('/getpostid/:postId', getPostId);

// lấy bài viết có codename
router.get('/getpostscodename', getPostsCodeName);

// lấy bài viết có totalWatch cao nhất
router.get('/getpoststotalwatch', getPostsTotalWatch);

// lấy bài viết của 1 user
router.get('/getpostsuser/:userId', verifyToken, getPostsUser);

// xóa 1 bài viết
router.delete('/deletepostsuser/:postId', verifyToken, deletePostsUser);

module.exports = router;