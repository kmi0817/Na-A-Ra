const express = require("express");
const Users = require("../models/users");
const Comments = require("../models/comments");
const Reports = require("../models/reports");
const crypto = require("crypto");
const router = express.Router();

router.get("/", async(req, res) => {
    if (req.session.user) {
        const home_results = await Users.findById(req.session.user.id);
        const comments_results = await Comments.find({ writer_id: req.session.user.id }).populate({ path: "hospital_id", select: { name: 1 }}).sort({ _id: -1 });
        const reports_results = await Reports.find({ writer_id: req.session.user.id }).populate({ path: "hospital_id", select: { name: 1 }});
        res.render("mypage", { home_results: home_results, comments_results: comments_results, reports_results: reports_results });
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
                req.session.destroy((error) => { res.redirect("/"); });
            } else {
                res.send(`<script>alert("일치하는 회원 정보가 없습니다."); history.go(-1);</script>`);
            }
        } else {
            res.send(`<script>alert("일치하는 회원 정보가 없습니다."); history.go(-1);</script>`);
        }
    }
});
module.exports = router;