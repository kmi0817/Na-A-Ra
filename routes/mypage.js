const express = require("express");
const Users = require("../models/users");
const Comments = require("../models/comments");
const Reports = require("../models/reports");
const router = express.Router();

router.get("/", async(req, res) => {
    if (req.session.user) {
        const home_results = await Users.findById(req.session.user.id);
        const comments_results = await Comments.find({ writer_id: req.session.user.id }).sort({ _id: -1 });
        const reports_results = await Reports.find({ writer_id: req.session.user.id }).populate({ path: "hospital_id", select: { name: 1 }});
        res.render("mypage", { home_results: home_results, comments_results: comments_results, reports_results: reports_results });
    } else {
        res.status(404).send("not found");
    }
});

module.exports = router;