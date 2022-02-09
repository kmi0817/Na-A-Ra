const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    writer_id: {
        type: String,
        required: true,
    },
    hospital_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date
    },
    is_deleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Comments", commentsSchema);