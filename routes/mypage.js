const express = require("express");
const crypto = require("crypto");
const router = express.Router();

// Collections
const Reviews = require("../models/reviews");
const Users = require("../models/users");
const Reports = require("../models/reports");
const Communities = require("../models/communities");
const Comments = require("../models/comments");

router.get("/", async(req, res) => {
    if (req.session.user) {
        const home_results = await Users.findById(req.session.user.id);
        const reviews_results = await Reviews.find({ writer_id: req.session.user.id }).populate({ path: "hospital_id", select: { name: 1 }}).sort({ _id: -1 });
        const reports_results = await Reports.find({ writer_id: req.session.user.id }).populate({ path: "hospital_id", select: { name: 1 }});
        const communities_results = await Communities.find({ writer: req.session.user.id, is_deleted: false }).sort({ _id: -1 });
        const comments_results = await Comments.find({ writer: req.session.user.id, is_deleted: false }).populate({ path: "posting", select: { _id: 1, title: 1, community: 1 } }).sort({ _id: -1 });
        res.render("mypage", { home_results: home_results, reviews_results: reviews_results, reports_results: reports_results, communities_results: communities_results, comments_results: comments_results });
    } else {
        res.status(404).send("not found");
    }
});

router.post("/change-password", async(req, res) => {
    const user = await Users.findOne({ user_id: req.body.input_id });
    if (user != null) {
        const computed_password = crypto.pbkdf2Sync(req.body.old_password, user["user_salt"], 190481, 64, "sha512").toString("base64");
        if (computed_password === user["user_hashedPassword"]) {
            const salt = crypto.randomBytes(64).toString("base64");
            const hashed_password = crypto.pbkdf2Sync(req.body.new_password, salt, 190481, 64, "sha512").toString("base64");

            await Users.findOneAndUpdate({ user_id: req.body.input_id }, { user_salt: salt, user_hashedPassword: hashed_password });
            res.redirect("/mypage");
        } else {
            res.send(`<script>alert("일치하는 회원 정보가 없습니다."); history.go(-1);</script>`);
        }
    } else {
        res.send(`<script>alert("일치하는 회원 정보가 없습니다."); history.go(-1);</script>`);
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