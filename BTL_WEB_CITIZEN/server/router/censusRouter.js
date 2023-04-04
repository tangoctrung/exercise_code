const router = require('express').Router();
const { 
    openCensus,
} = require('../controller/censusController');
const verifyToken = require('../middleware/auth');

// tạo một cuộc điều tra dân số
router.post("/opencensusa1", verifyToken, openCensus);



module.exports = router;