const express = require("express");
const mongoose = require("mongoose");
const request = require("request-promise-native");
const router = express.Router();

mongoose.connect("mongodb://localhost/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.get("/clinics", async (req, res) => {
    res.render("community/clinics")
});

router.get("/clinics/:id", async (req, res) => {
    res.render("community/post")
});

router.get("/questions", async (req, res) => {
    res.render("community/questions")
});

router.get("/questions/:id", async (req, res) => {
    res.render("community/post")
});

module.exports = router