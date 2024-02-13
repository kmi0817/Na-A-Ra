const express = require("express");
const crypto = require("crypto");
const router = express.Router();

// Collections
const Reviews = require("../models/reviews");
const Users = require("../models/users");
const Reports = require("../models/reports");
const Communities = require("../models/communities");
const Comments = require("../models/comments");

/**
 * @swagger
 * paths:
 *  /mypage:
 *      get:
 *          tags: [ 마이페이지 ]
 *          summary: "Get a mypage page"
 *          description: 기본 마이페이지 화면
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
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

/**
 * @swagger
 * paths:
 *  /mypage/change-password:
 *      patch:
 *          tags: [ 마이페이지 ]
 *          summary: "Change password"
 *          description: 회원의 비밀번호 변경하기
 *          parameters:
 *          -   name: "input_id"
 *              in: "formData"
 *              description: 회원의 아이디
 *              required: true
 *              type: "string"
 *          -   name: "old_password"
 *              in: "formData"
 *              description: 원래 비밀번호
 *              required: true
 *              type: "password"
 *          -   name: "new_password"
 *              in: "formData"
 *              description: 변경할 비밀번호
 *              required: true
 *              type: "password"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.patch("/change-password", async(req, res) => {
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

/**
 * @swagger
 * paths:
 *  /mypage/withdrawal:
 *      delete:
 *          tags: [ 마이페이지 ]
 *          summary: "Withdraw"
 *          description: 회원의 비밀번호 변경하기
 *          parameters:
 *          -   name: "_id"
 *              in: "formData"
 *              description: 회원의 ObjectId
 *              required: true
 *              type: "string"
 *          -   name: "withdrawal_id"
 *              in: "formData"
 *              description: 회원 아이디
 *              required: true
 *              type: "string"
 *          -   name: "withdrawal_password"
 *              in: "formData"
 *              description: 회원 비밀번호
 *              required: true
 *              type: "password"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
router.delete("/withdrawal", async(req, res) => {
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