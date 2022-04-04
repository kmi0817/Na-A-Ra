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
    try {
        const postings = await Communities.find({ is_deleted: false, community: "clinics" });
        res.render("community/clinics", { postings: postings })
    } catch (error) {
        console.log("*** " + error);
    }

});

router.get("/clinics/:id", async (req, res) => {
    try {
        const posting = await Communities.findById(req.params.id);
        console.log(posting);
        res.render("community/post", { posting: posting })
    } catch (error) {
        console.log("*** " + error);
    }
});

router.get("/clinics-write", async (req, res) => {
    res.render("community/write");
})

router.post("/clinics-post", async (req, res) => {
    try {
        let posting = new Communities();
        posting.title = req.body.inputTitle;
        posting.description = req.body.inputDescription;
        posting.community = "clinics";

        posting = await posting.save();
        res.redirect("/community/clinics");
    } catch (error) {
        res.send(`<script>alert("게시글 작성에 문제가 발생했습니다. 관리자에게 문의하세요."); history.go(-1);</script>`);
        console.log("*** DB 저장 문제: " + error);
    }
})

router.get("/questions", async (req, res) => {
    res.render("community/questions")
});

router.get("/questions/:id", async (req, res) => {
    res.render("community/post")
});



module.exports = router