const express = require("express");
const mongoose = require("mongoose");
const Article = require("./../models/mypage");
const router = express.Router();

mongoose.connect("mongodb://localhost/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.get("/", async (req, res) => {
    const results = await Article.find().sort({ createdAt: 'desc' });
    
    res.render("mypage/mypage", { results: results});
});

router.get("/show/:slug", async (req, res) => {
    const result = await Article.findOne({ slug: req.params.slug });
    if (result == null)
        res.redirect('/');

    res.render('mypage/show', {results: result});
});

router.get("/write", (req, res) => {
    res.render("mypage/write", {results: new Article() });
});

router.get("/edit/:id", async (req, res) => {
    const result = await Article.findById(req.params.id);
    res.render("mypage/edit", { results: result });
})

router.post("/process-write", async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect('write'));

router.put("/edit/:id", async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect('edit'));

router.delete("/del/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/mypage");
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let result = req.article;
        result.title = req.body.title;
        result.description = req.body.description;
        result.markdown = req.body.markdown;
        try {
            result = await result.save();
            console.log(result.id);
            res.redirect(`/mypage/show/${result.slug}`);
        } catch (err) {
            res.render(`mypage/${path}`, { results: result});
        }
    }
}
module.exports = router