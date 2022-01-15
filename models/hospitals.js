const mongoose = require("mongoose");

const hostpitalsSchema = new mongoose.Schema({
    addr: {
        type: String,
        required: true
    },
    type_code: {
        type: String,
        required: true
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
        type: Number,
        required: true
    },
    hospUrl: {
        type: String,
        required: true
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
        required: true
    },
    sidoCdNm: {
        type: String,
        required: true
    },
    telno: {
        type: String,
        required: true
    },
    coord: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Hospitals", hostpitalsSchema);