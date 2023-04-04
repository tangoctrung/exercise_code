const mongoose = require('mongoose');

const MailSchema = new mongoose.Schema({

    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    receiver: [ // danh sách người nhận
        {type: String, ref: 'user'}
    ],
    sender: { // người gửi
        type: String,
        ref: 'user',
    },
    // file: [ // list các file, ảnh của mail
    //     {
    //         type: {type: String, default: ''},
    //         url: {type: String, default: ''},
    //     }
    // ],
    watched: [ // danh sách người dùng đã xem mail này
        {type: String, ref: 'user'}
    ],
    deleted: [ // danh sách người dùng đã xóa mail này
        {type: String, ref: 'user'}
    ],
        

}, { timestamps: true });

module.exports = mongoose.model("mail", MailSchema);