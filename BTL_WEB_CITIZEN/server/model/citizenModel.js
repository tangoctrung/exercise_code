const mongoose = require('mongoose');

// khai báo thông tin cho công dân thu thập được

const CitizenSchema = new mongoose.Schema({

    // lastName: { // họ
    //     type: String,
    //     required: true,
    // },
    // firstName: { // tên
    //     type: String,
    //     required: true,
    // },
    // bufferName: { // tên đệm
    //     type: String,
    //     required: true,
    // },
    name: { // tên
        type: String,
        required: true,
    },
    numCCCD: {
        type: String,
        required: false,
        unique: true,
    },
    education: {
        type: String,
        required: false,
        default: "",
    },
    nation: { // dân tộc: KINH, MÔNG, ...
        type: String,
        required: false,
        default: "",
    },
    religion: { // tôn giáo
        type: String,
        required: false,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    email: {
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
    },
    job: {
        type: String,
        required: false,
        default: "",
    },
    addressCity: {     
        type: String,
        required: false,
        default: "",
    },
    addressDistrict: {
        type: String,
        required: false,
        default: "",
    },
    addressWard: {
        type: String,
        required: false,
        default: "",
    },
    addressVillage: {
        type: String,
        required: false,
        default: "",
    },
    hometownCity: {
        type: String,
        required: false,
        default: "",
    },
    hometownDistrict: {
        type: String,
        required: false,
        default: "",
    },
    hometownWard: {
        type: String,
        required: false,
        default: "",
    },
    hometownVillage: {
        type: String,
        required: false,
        default: "",
    },
    gender: {
        type: String,
        required: false,
        default: "",
    },
    infoDetail: {
        type: String,
        required: false,
        default: "",
    },
    infoFamily: {
        type: String,
        required: false,
        default: "",
    }

}, { timestamps: true });

module.exports = mongoose.model("citizen", CitizenSchema);