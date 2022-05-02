const express = require("express");
const mongoose = require("mongoose");
const request = require("request-promise-native");
const router = express.Router();

// Collections
const Communities = require("../models/communities");
const Comments = require("../models/comments");

mongoose.connect("mongodb://localhost/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 상담게시글 board 페이지
router.get("/clinics", async (req, res) => {
    const page = Number(req.query.page || 1); // default page is 1, query는 String이므로 Number로 형변환 필요
    const perPage = 5
    try {
        const total = await Communities.countDocuments({ is_deleted: false, community: "clinics" }); // 총 게시글 개수
        const postings = await Communities.find({ is_deleted: false, community: "clinics" })
                                            .sort({ created_at: -1 }) // 최신 글이 먼저 보이도록 함
                                            .skip(perPage * (page - 1)) // 검색에서 제외할 데이터 개수
                                            .limit(perPage); // 가져올 포스팅 개수
        const totalPages = Math.ceil(total / perPage);

        res.render("community/board", { category: "clinics", postings: postings, total: total, totalPages: totalPages });
    } catch (error) {
        console.log("*** " + error);
    }
});

// 특정 상담게시글 페이지
router.get("/clinics/:id", async (req, res) => {
    try {
        const posting = await Communities.findById(req.params.id);
        const comments = await Comments.find({ posting: req.params.id }).sort({ _id: -1 });
        res.render("community/post", { category: "clinics", posting: posting, comments: comments });
    } catch (error) {
        console.log("*** " + error);
    }
});

// 상담게시글 작성 페이지
router.get("/clinics-write", async (req, res) => {
    res.render("community/write", { category: "clinics" });
});

// 상담게시글 등록 처리
router.post("/clinics-post", async (req, res) => {
    try {
        let posting = new Communities();
        posting.title = req.body.inputTitle;
        posting.description = req.body.inputDescription;
        posting.community = "clinics";
        posting.created_at = new Date();

        posting = await posting.save();
        res.redirect("/community/clinics");
    } catch (error) {
        res.send(`<script>alert("게시글 작성에 문제가 발생했습니다. 관리자에게 문의하세요."); history.go(-1);</script>`);
        console.log("*** DB 저장 문제: " + error);
    }
});

// 상담게시글 댓글 등록 처리
router.post("/clinics/comment-post", async(req, res) => {
    console.log(req.body.posting_id);
    try {
        let comment = new Comments();
        comment.posting = req.body.posting_id;
        comment.created_at = new Date();
        comment.description = req.body.description;

        comment = await comment.save();
        res.redirect(`/community/clinics/${req.body.posting_id}`);
    } catch (error) {
        res.send(`<script>alert("게시글 작성에 문제가 발생했습니다. 관리자에게 문의하세요."); history.go(-1);</script>`);
        console.log("*** DB 저장 문제: " + error);
    }
});

// 질문게시글 board 페이지
router.get("/questions", async (req, res) => {
    const page = Number(req.query.page || 1); // default page is 1, query는 String이므로 Number로 형변환 필요
    const perPage = 5
    try {
        const total = await Communities.countDocuments({ is_deleted: false, community: "questions" }); // 총 게시글 개수
        const postings = await Communities.find({ is_deleted: false, community: "questions" })
            .sort({ created_at: -1 }) // 최신 글이 먼저 보이도록 함
            .skip(perPage * (page - 1)) // 검색에서 제외할 데이터 개수
            .limit(perPage); // 가져올 포스팅 개수
        const totalPages = Math.ceil(total / perPage);

        res.render("community/board", { category: "questions", postings: postings, total: total, totalPages: totalPages });
    } catch (error) {
        console.log("*** " + error);
    }
});

// 특정 질문게시글 페이지
router.get("/questions/:id", async (req, res) => {
    try {
        const posting = await Communities.findById(req.params.id);
        const comments = await Comments.find({ posting: req.params.id }).sort({ _id: -1 });
        res.render("community/post", { category: "questions", posting: posting, comments: comments });
    } catch (error) {
        console.log("*** " + error);
    }
});

// 질문게시글 작성 페이지
router.get("/questions-write", async (req, res) => {
    res.render("community/write", { category: "questions" });
});

// 질문게시글 등록 처리
router.post("/questions-post", async (req, res) => {
    try {
        let posting = new Communities();
        posting.title = req.body.inputTitle;
        posting.description = req.body.inputDescription;
        posting.community = "questions";
        posting.created_at = new Date();

        posting = await posting.save();
        res.redirect("/community/questions");
    } catch (error) {
        res.send(`<script>alert("게시글 작성에 문제가 발생했습니다. 관리자에게 문의하세요."); history.go(-1);</script>`);
        console.log("*** DB 저장 문제: " + error);
    }
});

// 질문게시글 댓글 등록 처리
router.post("/questions/comment-post", async (req, res) => {
    console.log(req.body.posting_id);
    try {
        let comment = new Comments();
        comment.posting = req.body.posting_id;
        comment.created_at = new Date();
        comment.description = req.body.description;

        comment = await comment.save();
        res.redirect(`/community/questions/${req.body.posting_id}`);
    } catch (error) {
        res.send(`<script>alert("게시글 작성에 문제가 발생했습니다. 관리자에게 문의하세요."); history.go(-1);</script>`);
        console.log("*** DB 저장 문제: " + error);
    }
});

module.exports = router