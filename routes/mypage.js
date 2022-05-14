const express = require("express");
const Users = require("../models/users");
const Reviews = require("../models/reviews");
const Reports = require("../models/reports");
const Communities = require("../models/communities");
const Comments = require("../models/comments");
const crypto = require("crypto");
const router = express.Router();

router.get("/", async(req, res) => {
    if (req.session.user) {
        const home_results = await Users.findById(req.session.user.id); //가입일시, 아이디, 비밀번호, 비밀번호 변경
        const reviews_results = await Reviews.find({ writer_id: req.session.user.id }).populate({ path: "hospital_id", select: { name: 1 }}).sort({ _id: -1 });
        const reports_results = await Reports.find({ writer_id: req.session.user.id }).populate({ path: "hospital_id", select: { name: 1 }});
        const communities_results = await Communities.find({ writer: req.session.user.id }).sort({ _id: -1 });
        const comments_results = await Comments.find({ writer: req.session.user.id }).populate({ path: "posting", select: { _id: 1, title: 1 } }).sort({ _id: -1 });
        res.send({ home_results: home_results, reviews_results: reviews_results, reports_results: reports_results, communities_results: communities_results, comments_results: comments_results });
    } else {
        res.status(404).send("not found");
    }
});

router.post("/withdrawal", async(req, res) => {
    if (req.session.user) {
        const user = await Users.findById(req.body._id);
        if (user['user_id'] === req.body.withdrawal_id) {
            const computed_password = crypto.pbkdf2Sync(req.body.withdrawal_password, user["user_salt"], 190481, 64, "sha512").toString("base64");
            if (computed_password === user["user_hashedPassword"]) {
                await Users.findByIdAndUpdate(req.body._id, { is_withdrawn: true });
                req.session.destroy((error) => { res.send({text: "탈퇴되었습니다."}); });
            } else {
                res.send({text: "일치하는 회원 정보가 없습니다."});
            }
        } else {
            res.send({text: "일치하는 회원 정보가 없습니다."});
        }
    }
});
module.exports = router;