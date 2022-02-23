const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 20
    },
    user_hashedPassword: {
        type: String,
        required: true
    },
    user_salt: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date
    },
    is_admin: {
        type: Boolean,
        required: true,
        default: false
    },
    is_withdrawn: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Users", usersSchema);