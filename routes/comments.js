const express = require("express");
const mongoose = require("mongoose");
const Comments = require("../models/comments");
const Hospitals = require("../models/hospitals");
const router = express.Router();

mongoose.connect("mongodb://localhost/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.get("/:id", async (req, res) => {
    const comments = await Comments.find({ hospital_id: req.params.id }).sort({ _id: -1 }); // sorting collection by date (created_at)
    const hospital = await Hospitals.findById(req.params.id);
    res.render("comments/index", { comments: comments, hospital: hospital });
});

router.post("/write", async(req, res) => {
    let comment = new Comments();
    comment.writer_id = req.body.writer_id;
    comment.hospital_id = req.body.hospital_id;
    comment.description = req.body.description;

    comment = await comment.save();
    res.redirect(`/comments/${req.body.hospital_id}`);
});

module.exports = router;