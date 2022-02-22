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
    //const comments = await Comments.find({ hospital_id: req.params.id, is_deleted: false }).sort({ _id: -1 });
    const comments = await Comments.find({ hospital_id: req.params.id, is_deleted: false }).populate({ path: "writer_id", select: { user_id: 1 } }).sort({ _id: -1 });
    const hospital = await Hospitals.findById(req.params.id);
    if (req.session.admin) {
        res.send({comments: comments, hospital: hospital, admin_id: req.session.admin['id']})
    } else if (req.session.user) {
        res.send({comments: comments, hospital: hospital, user_id: req.session.user['name'], text: "유저 있음"})
    } else {
        res.send({comments: comments, hospital: hospital, text: "유저 없음"})
    }
});

router.post("/write", async(req, res) => {
    const writer_id = String(req.body.writer_id);
    const hospital_id = String(req.body.hospital_id);
    const description = String(req.body.description);

    if (req.session.admin || req.session.user) {
        const banned_words = ["시발", "씨발", "씨팔", "ㅅㅂ", "썅", "등신", "병신", "븅신", "븅딱", "좆", "개새끼", "년", "애미", "애비",
            "간나", "쌍간나", "종간나", "개새", "개돼지", "씹", "걸레", "고자", "남창", "느개비", "느금마", "니미", "뒤져", "또라이", "똘추",
            "맘충", "머저리", "지랄", "엠창", "호모" ]

        for (index in banned_words) {
            if (req.body.description.includes(banned_words[index])) {
                return res.send({text: "금지된 단어가 포함되어 있습니다."});
            }
        }
        var comment = new Comments();
        comment.writer_id = writer_id;
        comment.hospital_id = hospital_id;
        comment.description = description;
        comment = await comment.save();

        const comments = await Comments.find({ hospital_id: req.body.hospital_id }).sort({ _id: -1 });
        res.send({comments: comments, text: "완료"});
    }
    else {
        res.send({comments: null, text: "로그인이 필요합니다."});
    }
});

router.delete("/delete/:id", async(req, res) => {
    if (req.session.admin) { await Comments.findByIdAndUpdate(req.params.id, { is_deleted: true }); }
    res.redirect(`/comments/${req.body.hospital_id}`);
});

module.exports = router;