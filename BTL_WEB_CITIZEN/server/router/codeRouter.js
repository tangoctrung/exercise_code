const router = require('express').Router();
const { addCode, getAllCode, openCensusCode, 
    checkTimeCensus, getAllCodeAndCitizen, editTimeCensus, completeCensus,
    getAllCodeOpenCensus,
} = require('../controller/codeController');
const verifyToken = require('../middleware/auth');


// ADD CODE FOR CITY,...
router.post("/addcode", verifyToken, addCode);

// LẤY tất cả các vùng thuộc vùng có id
router.get("/getallcode/:id", verifyToken, getAllCode);

// LẤY tất cả các vùng thuộc vùng có id trong thời gian khai báo dân số
router.get("/getallcodeopencensus/:id", verifyToken, getAllCodeOpenCensus);

// Lấy tất cả các vùng cùng dân cư đã được khai báo của vùng có id
router.get("/getallcodeandcitizen/:id", verifyToken, getAllCodeAndCitizen);

// tạo một cuộc khảo sát
router.put("/opencensuscode", verifyToken, openCensusCode);

// edit time một cuộc khảo sát
router.put("/edittimecensus", verifyToken, editTimeCensus);

// đánh dấu đã hoàn thành khảo sát
router.put("/completecensus", verifyToken, completeCensus);

// kiểm tra xem địa phương đã hết thời gian khai báo hay chưa
router.put("/checktimecensus", verifyToken, checkTimeCensus);


module.exports = router;