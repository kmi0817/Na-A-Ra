const mongoose = require("mongoose");

const reportsSchema = new mongoose.Schema({
    writer_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }],
    hospital_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospitals",
        required: true
    }],
    created_at: {
        type: Date,
        required: true,
        default: new Date
    },
    is_confirmed: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Reports", reportsSchema);