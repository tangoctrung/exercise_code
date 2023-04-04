const router = require('express').Router();
const { createMail, 
    deleteMail,
    getAllMailSend,
    getAllMailReceive,
    updateWatched, } = require('../controller/mailController');
const verifyToken = require('../middleware/auth');

// tạo một mail
router.post('/createmail', verifyToken, createMail);

// xóa một mail
router.put('/deletemail', verifyToken, deleteMail);

// lấy tất cả  mail gửi của 1 user
router.get('/getallmailsend', verifyToken, getAllMailSend);

// lấy tất cả  mail nhận của 1 user
router.get('/getallmailreceive', verifyToken, getAllMailReceive);

// update watched của một mail
router.put('/updatewatched', verifyToken, updateWatched);

module.exports = router;