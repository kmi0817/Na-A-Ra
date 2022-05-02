const express = require("express");
const mongoose = require("mongoose");
const Communities = require("../models/communities");
const request = require("request-promise-native");
const router = express.Router();

mongoose.connect("mongodb://localhost/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.get("/clinics", async (req, res) => {
    const page = Number(req.query.page || 1); // default page is 1, query는 String이므로 Number로 형변환 필요
    const perPage = 5
    try {
        const total = await Communities.countDocuments({ community: "clinics" }); // 총 게시글 개수
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

router.get("/clinics/:id", async (req, res) => {
    try {
        const posting = await Communities.findById(req.params.id);
        res.render("community/post", { category: "clinics", posting: posting });
    } catch (error) {
        console.log("*** " + error);
    }
});

router.get("/clinics-write", async (req, res) => {
    res.render("community/write", { category: "clinics" });
});

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

router.get("/questions", async (req, res) => {
    try {
        const postings = await Communities.find({ is_deleted: false, community: "questions" });
        res.render("community/board", { category: "questions", postings: postings });
    } catch (error) {
        console.log("*** " + error);
    }
});

router.get("/questions/:id", async (req, res) => {
    try {
        const posting = await Communities.findById(req.params.id);
        console.log(posting);
        res.render("community/post", { category: "questions", posting: posting });
    } catch (error) {
        console.log("*** " + error);
    }
});

router.get("/questions-write", async (req, res) => {
    res.render("community/write", { category: "questions" });
});

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


module.exports = router