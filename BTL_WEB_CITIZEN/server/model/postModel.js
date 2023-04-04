const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    images: [
        {type: String, default: ''}
    ],
    author: {
        ref: "user",
        type: String,
    },
    totalWatch: {
        type: Number,
        default: 0,
    },
    codeName: { // tên tỉnh / thành phố của tác giả
        type: String,
        require: true,
    }
   
}, { timestamps: true });

module.exports = mongoose.model("post", PostSchema);