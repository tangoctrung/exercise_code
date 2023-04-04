const mongoose = require('mongoose');


const CodeSchema = new mongoose.Schema({

    code: {  // mã vùng
        type: String,
        required: true,
        unique: true,
    },
    name: {  // tên vùng
        type: String,
        required: true,
    },
    provider: { // người cấp mã
        ref: 'user',
        type: String,
        required: true,
    },
    level: {  // vùng đó thuộc cấp tỉnh, huyện hay xã, thôn
        type: String,
        required: true,
    },
    isComplete: { // đã hoàn thành việc khai báo dân số hay chưa
        type: Boolean,
        default: false,
    },
    timeOpen: {
        type: Date,
    },
    timeClose: {
        type: Date,
    },
    statusCensus: {
        type: Boolean,
        default: false,
    }


}, { timestamps: true });

module.exports = mongoose.model("code", CodeSchema);