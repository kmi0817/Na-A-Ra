const mongoose = require("mongoose");

const mypageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    }
});

module.exports = mongoose.model('Mypage', mypageSchema);