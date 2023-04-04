const router = require('express').Router();
const { 
    AddCitizen, UpdateCitizen, DeleteCitizen ,
    getCitizenNumCCCD, getCitizenId,  getAllCitizen,
    getAllCitizenCode, getCitizenGender,getCitizenReligion,
    getCitizenNation, getCitizenAge, getCitizenEducation,
    getCitizenJob, getCitizenManyCode
} = require('../controller/citizenController');
const verifyToken = require('../middleware/auth');

// nhập dữ liệu cho citizen
router.post("/addcitizen", verifyToken, AddCitizen);

// cập nhật dữ liệu cho citizen
router.put("/updatecitizen/:id", verifyToken, UpdateCitizen);

// xóa dữ liệu của citizen
router.delete("/deletecitizen/:id", verifyToken, DeleteCitizen);

// lấy thông tin tất cả công dân
router.get("/getallcitizen", verifyToken, getAllCitizen);

// lấy thông tin tất cả công dân theo vùng
router.get("/getallcitizencode", verifyToken, getAllCitizenCode);

// lấy thông tin công dân theo nhiều vùng
router.get("/getcitizenmanycode", verifyToken, getCitizenManyCode);

// lấy thông tin tất cả công dân theo điều kiện nào đó
router.get("/getcitizennumCCCD", verifyToken, getCitizenNumCCCD);

// lấy thông tin tất cả công dân theo điều kiện nào đó
router.get("/getcitizenid/:id", verifyToken, getCitizenId);

// lấy công dân theo tỉ lệ nam nữ của một vùng nào đó
router.get("/getcitizengender", verifyToken, getCitizenGender);

// lấy công dân theo tỉ lệ dân tộc của một vùng nào đó
router.get("/getcitizennation", verifyToken, getCitizenNation);

// lấy công dân theo tỉ lệ tôn giáo của một vùng nào đó
router.get("/getcitizenreligion", verifyToken, getCitizenReligion);

// lấy công dân theo tỉ lệ độ tuổi của một vùng nào đó
router.get("/getcitizenage", verifyToken, getCitizenAge);

// lấy công dân theo tỉ lệ trình độ giáo dục của một vùng nào đó
router.get("/getcitizeneducation", verifyToken, getCitizenEducation);

// lấy công dân theo tỉ lệ ngành nghề của một vùng nào đó
router.get("/getcitizenjob", verifyToken, getCitizenJob);


module.exports = router;