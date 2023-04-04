const router = require('express').Router();
const { 
    registerUser, loginUser, getUser, getAllUser, updateUser, getAllUserIsProvied, 
    changePassword, getAUser, changePasswordSecondary,
} = require('../controller/userController');

const verifyToken = require('../middleware/auth');


// CREATE A USER / REGISTER
router.post("/auth/register", verifyToken, registerUser);

// LOGIN
router.post("/auth/login", loginUser);

// GET USER
router.get("/getuser", verifyToken, getUser);

// GET A USER
router.get("/getauser/:userId", verifyToken, getAUser);

// GET ALL USER
router.get("/getalluser", verifyToken, getAllUser);

// lấy tất cả user được bạn cấp tài khoản
router.get("/getalluserisprovied/:id", verifyToken, getAllUserIsProvied);

// UPDATE A USER
router.put("/updateuser/:id", verifyToken, updateUser);

// CHANGE PASSWORD
router.put("/changepassword", verifyToken, changePassword);

// CHANGE PASSWORD SECONDARY
router.put("/changepasswordsecondary", verifyToken, changePasswordSecondary);


module.exports = router;