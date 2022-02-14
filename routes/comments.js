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
    const comments = await Comments.find({ hospital_id: req.params.id }).sort({ created_at: "desc" });
    const hospital = await Hospitals.findById(req.params.id);
    console.log(hospital);
    res.render("comments/index", { comments: comments, hospital: hospital });
});

module.exports = router;