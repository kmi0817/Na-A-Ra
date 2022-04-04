const mongoose = require("mongoose");

const communitiesSchema = new mongoose.Schema({
    // writer: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Users",
    //     required: true,
    // }],
    writer: {
        type: String,
        required: true,
        default: "익명"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
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
    },
    community: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Communities", communitiesSchema);