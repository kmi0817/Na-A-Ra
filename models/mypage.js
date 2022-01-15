const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

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
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

mypageSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower:true, strict: true });
    }

    next();
});

module.exports = mongoose.model('Mypage', mypageSchema);