const express = require("express");
const Users = require("../models/users");
const router = express.Router();

router.get("/", async(req, res) => {
    if (req.session.user) {
        res.render("mypage");
    } else {
        res.status(404).send("not found");
    }
});

module.exports = router;