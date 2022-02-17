const express = require("express");
const Users = require("../models/users");
const router = express.Router();

router.get("/", async(req, res) => {
    if (req.session.user) {
        const home_results = await Users.findOne({ user_id: req.session.user.id });
        res.render("mypage", { home_results: home_results });
    } else {
        res.status(404).send("not found");
    }
});

module.exports = router;