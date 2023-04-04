const mongoose = require('mongoose');

const CensusSchema = new mongoose.Schema({
    statusCensus: { // trạng thái mở khảo sát: đang mở hay chưa mở
        type: Boolean,
        default: false,
    },
    timeOpen: {                 
        type: Date,
    },
    timeClose: {
        type: Date,
    },
    opener: { // id của người mở cuộc điều tra dân số
        type: String,
        ref: 'user',
    },
    codeArea: { // mã của vùng đang mở cuộc điều tra dân số
        type: String,
        ref: 'code',
    }
}, { timestamps: true });

module.exports = mongoose.model("census", CensusSchema);