const mongoose = require("mongoose");

const hospitalsSchema = new mongoose.Schema({
    addr: {
        type: String,
        required: true,
        default: ""
    },
    cmdcGdrCnt: {
        type: Number
    },
    cmdcIntnCnt: {
        type: Number
    },
    cmdcResdntCnt: {
        type: Number
    },
    cmdcSdrCnt: {
        type: Number
    },
    detyGdrCnt: {
        type: Number
    },
    detyIntnCnt: {
        type: Number
    },
    detyResdntCnt: {
        type: Number
    },
    detySdrCnt: {
        type: Number
    },
    drTotCnt: {
        type: Number
    },
    estbDd: {
        type: Number
    },
    hospUrl: {
        type: String,
    },
    mdeptGdrCnt: {
        type: Number
    },
    mdeptIntnCnt: {
        type: Number
    },
    mdeptResdntCnt: {
        type: Number
    },
    mdeptSdrCnt: {
        type: Number
    },
    postNo: {
        type: Number
    },
    sgguCdNm: {
        type: String,
        required: true,
        default: ""
    },
    sidoCdNm: {
        type: String,
        required: true,
        default: ""
    },
    telno: {
        type: String
    },
    type_code: {
        type: String,
        required: true,
        default: "-1"
    },
    coord: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    reports_cnt: {
        type: Number,
        required: true,
        default: 0
    },
    zipCd: {
        type: "String",
        required: true,
        default: "-1"
    }
});

module.exports = mongoose.model("Hospitals", hospitalsSchema);