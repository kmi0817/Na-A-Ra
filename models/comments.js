const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    writer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }],
    posting: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Communities",
        required: true
    }],
    created_at: {
        type: Date,
        required: true,
        default: new Date
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 500
    },
    is_deleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Comments", commentsSchema);