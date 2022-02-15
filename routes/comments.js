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

    if (req.session.admin) {
        res.render("comments/index_admin", { comments: comments, hospital: hospital, admin_id: req.session.admin['id'] });
    } else if (req.session.user) {
        res.render("comments/index_user", { comments: comments, hospital: hospital, user_id: req.session.user['id'] });
    } else {
        res.render("comments/index", { comments: comments, hospital: hospital });
    }
});

router.post("/write", async(req, res) => {
    if (req.session.admin || req.session.user) {
        const banned_words = ["시발", "씨발", "씨팔", "ㅅㅂ", "썅", "등신", "병신", "븅신", "븅딱", "좆", "개새끼", "년", "애미", "애비",
            "간나", "쌍간나", "종간나", "개새", "개돼지", "씹", "걸레", "고자", "남창", "느개비", "느금마", "니미", "뒤져", "또라이", "똘추",
            "맘충", "머저리", "지랄", "엠창", "호모" ]

        for (index in banned_words) {
            if (req.body.description.includes(banned_words[index])) {
                return res.send(`<script>alert("금칙어를 포함한 댓글입니다."); history.go(-1);</script>`);
            }
        }

        let comment = new Comments();
        comment.writer_id = req.body.writer_id;
        comment.hospital_id = req.body.hospital_id;
        comment.description = req.body.description;

        comment = await comment.save();
    }
    res.redirect(`/comments/${req.body.hospital_id}`);
});

router.delete("/delete/:id", async(req, res) => {
    if (req.session.admin) { await Comments.findByIdAndDelete(req.params.id); }
    res.redirect(`/comments/${req.body.hospital_id}`);
});

module.exports = router;