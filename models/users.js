const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    user_hashedPassword: {
        type: String,
        required: true
    },
    user_salt: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Users", usersSchema);