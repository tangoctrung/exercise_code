const mongoose = require('mongoose');

// khai báo thông tin cho người dùng hệ thống

const UserSchema = new mongoose.Schema({

    name: { // họ và tên
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    position: { // vị trí, chức vụ
        type: String,
        required: true,
    },
    typeAccount:{
        type: String,
        required: true,
    },
    accountName: { // tên tài khoản 
        // type: mongoose.Types.ObjectId,
        type: String,
        ref: 'code',
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    providerAccount: {
        type: String,
        required: true,
        ref: 'user',
    },
    refreshToken: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        required: false,
        default: "",
    },
    date: {
        type: Date,
        required: false,
        default: "",
    },
    nation: {
        type: String,
        required: false,
        default: "",
    },
    religion: {
        type: String,
        required: false,
        default: "",
    },
    numCCCD: {
        type: String,
        required: false,
        unique: true,
    },
    address: {
        type: String,
        required: false,
        default: "",
    },
    hometown: {
        type: String,
        required: false,
        default: "",
    },
    gender: {
        type: String,
        required: false,
        default: "",
    },
    infoOther: {
        type: String,
        required: false,
        default: "",
    },

}, { timestamps: true });

module.exports = mongoose.model("user", UserSchema);