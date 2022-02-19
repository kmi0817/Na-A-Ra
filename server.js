const express = require("express");
const adminRouter = require("./routes/admin");
const commentsRouter = require("./routes/comments");
const mypageRouter = require("./routes/mypage");
const Hospitals = require("./models/hospitals");
const Users = require("./models/users");
const Reports = require("./models/reports");
const methodOverride = require("method-override");
const http = require("http");
const crypto = require("crypto");
const expressSession = require("express-session");

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false })); // enable to use req.body.(input field)
app.use(expressSession({
    secret: "secretKey",
    resave: true,
    saveUninitialized: true
}));

// views engine (convert ejs code to HTML)
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.engine("html", require("ejs").renderFile);

// routes
app.get("/", async (req, res) => {
    const inputAddr = req.query.inputAddr;
    const inputType = req.query.inputType;
    const inputFilter = req.query.inputFilter;
    const addrFilter = req.query.addrFilter;

    if (typeof inputAddr == "undefined" || typeof inputType == "undefined" || typeof inputFilter == "undefined") {
        if (req.session.user) {
            res.render("index_user", { results: "", user_id: req.session.user['id'] });
        } else if (req.session.admin) {
            res.render("index_admin", { results: "", admin_id: req.session.admin['id'] });
        } else {
            res.render("index", { results: "" });
        }
    } else {        
        let searchAddr;
        if (addrFilter === "lo") {
            if (inputAddr.includes("서울")) {
                let listAddr = inputAddr.split(" ");
                let road = listAddr[2].substr(0, listAddr[2].indexOf("로") + 1);
                searchAddr = `${listAddr[0]}특별시 ${listAddr[1]} ${road}`;
            } else if (inputAddr.includes("인천")  || inputAddr.includes("부산") || inputAddr.includes("울산") || inputAddr.includes("대구") || inputAddr.includes("광주") || inputAddr.includes("대전")) {
                let listAddr = inputAddr.split(" ");
                searchAddr = `${listAddr[0]}광역시 ${listAddr[1]} ${listAddr[2]}`;
            } else {
                let listAddr = inputAddr.split(" ");
                let road = listAddr[3].substr(0, listAddr[3].indexOf("로") + 1);
                searchAddr = `${listAddr[0]}도 ${listAddr[1]} ${listAddr[2]} ${road}`;
            }
        } else if (addrFilter === "gu") {
            if (inputAddr.includes("서울")) {
                let listAddr = inputAddr.split(" ");
                let gu = listAddr[1].substr(0, listAddr[1].indexOf("구") + 1);
                searchAddr = `${listAddr[0]}특별시 ${gu}`;
            } else if (inputAddr.includes("인천")  || inputAddr.includes("부산") || inputAddr.includes("울산") || inputAddr.includes("대구") || inputAddr.includes("광주") || inputAddr.includes("대전")) {
                let listAddr = inputAddr.split(" ");
                searchAddr = `${listAddr[0]}광역시 ${listAddr[1]}`;
            } else {
                let listAddr = inputAddr.split(" ");
                let gu = listAddr[2].substr(0, listAddr[2].indexOf("구") + 1);
                searchAddr = `${listAddr[0]}도 ${listAddr[1]} ${gu}`;
            }
        }
        
        let conditions;
        if (inputFilter == "all") {
            if (inputType == "외과") {
                conditions = {
                    $and : [
                        {name : {$regex : "외과"}},
                        {name : {$not : {$regex : "정형"}}},
                        {name : {$not : {$regex : "치과"}}}
                    ],
                    addr: {$regex: searchAddr}
                }
            } else {
                conditions = {
                    name: {$regex: inputType},
                    addr: {$regex: searchAddr}
                }
            }
        }
        
        else if (inputFilter == "infant") {
            if (inputType == "외과") {
                conditions = {
                    addr: {$regex: searchAddr},
                    $and : [
                        {name : {$regex : "외과"}},
                        {name : {$not : {$regex : "정형"}}},
                        {name : {$not : {$regex : "치과"}}},
                        {name: {$regex: "소아"}}
                    ]
                }
            } else {
                conditions = {
                    $and : [
                        {name : {$regex : inputType}},
                        {name : {$regex : "소아"}}
                    ],
                    addr: {$regex: searchAddr}
                }
            }
        }
        let results = await Hospitals.find(conditions);

        // Send index.ejs data
        if (results.length > 0) {
            if (req.session.user) {
                res.render("index_user", { results: results, user_id: req.session.user['id'] });
            } else if (req.session.admin) {
                res.render("index_admin", { results: results, admin_id: req.session.admin['id'] });
            } else {
                res.render("index", { results: results });
            }
        } else {
            if (req.session.user) {
                res.render("index_user", { results: '일치하는 검색 결과가 없습니다.', user_id: req.session.user['id'] });
            } else if (req.session.admin) {
                res.render("index_admin", { results: '일치하는 검색 결과가 없습니다.', admin_id: req.session.admin['id'] });
            }else {
                res.render("index", { results: '일치하는 검색 결과가 없습니다.' });
            }
        }
    }
});

app.get("/test", (req, res) => { res.render("test"); });

app.post("/process/:type", async(req, res) => {
    const type = req.params.type;

    if (type == "signup") {
        try {
            const salt = crypto.randomBytes(64).toString("base64");
            const hashed_password = crypto.pbkdf2Sync(req.body.createPassword, salt, 190481, 64, "sha512").toString("base64");

            let user = new Users();
            user.user_id = req.body.createId;
            user.user_salt = salt;
            user.user_hashedPassword = hashed_password;

            user = await user.save();
            res.redirect("/");
        } catch (error) {
            if (error.code === 11000) {
                res.send(`<script>alert("이미 존재하는 아이디입니다."); history.go(-1);</script>`);
            } else {
                res.send(`<script>alert("회원가입에 문제가 발생했습니다. 관리자에게 문의하세요."); history.go(-1);</script>`);
                console.log("*** DB 저장 문제: " + error);
            }
        }
    } else if (type == "login") {
        const results = await Users.findOne({ user_id: req.body.inputId });

        if (results != null) {
            const computed_password = crypto.pbkdf2Sync(req.body.inputPassword, results["user_salt"], 190481, 64, "sha512").toString("base64");

            if (computed_password == results['user_hashedPassword']) {
                if (results["is_admin"]) {
                    req.session.admin = {
                        id: results["_id"],
                        name: req.body.inputId,
                        authorized: true
                    };
                } else {
                    // session save
                    req.session.user = {
                        id: results["_id"],
                        name: req.body.inputId,
                        authorized: true
                    };
                }
                res.redirect("/");
            }
        } else {
            res.send(`<script>alert("일치하는 회원 정보가 없습니다."); history.go(-1);</script>`);
        }
    } else if (type == "logout") {
        req.session.destroy((error) => { res.redirect("/"); });
    } else if (type == "change-password") {
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
    } else if (type == "report") {
        let report = new Reports();
        report.writer_id = req.body.writer_id;
        report.hospital = req.body.hospital_id;

        report = await report.save();
        res.send(`<script>alert("신고가 접수되었습니다. 관리자 확인 후 신고횟수에 반영됩니다."); history.go(-1);</script>`);
    }
});

app.use("/admin", adminRouter);
app.use("/comments", commentsRouter);
app.use("/mypage", mypageRouter);

// web server
server.listen(3000, () => {
    // port: 3000 app success
    console.log("localhost:3000 OK");
});
// const server = app.listen(3000, () => {
//     // port: 3000 app success
//     console.log("localhost:3000 OK");
// })