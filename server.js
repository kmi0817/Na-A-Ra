const express = require("express");
const methodOverride = require("method-override");
const http = require("http");
const crypto = require("crypto");
const expressSession = require("express-session");

// Router
const adminRouter = require("./routes/admin");
const reviewsRouter = require("./routes/reviews");
const communityRouter = require("./routes/community");
const mypageRouter = require("./routes/mypage");

// Models
const Hospitals = require("./models/hospitals");
const Users = require("./models/users");
const Reports = require("./models/reports");

const { swaggerUi, specs } = require("./swagger/swagger");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // enable to use req.body.(input field)
app.use(expressSession({
    secret: "secretKey",
    resave: true,
    saveUninitialized: true
}));
app.use(express.static("public"));

// views engine (convert ejs code to HTML)
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.engine("html", require("ejs").renderFile);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// routes
/**
 * @swagger
 * paths:
 *  /:
 *      get:
 *          tags: [ 검색 ]
 *          description: 주소명/병원명 검색 페이지
 *          parameters:
 *          -   name: "search_type"
 *              in: "path"
 *              description: 주소명 검색 혹은 병원명 검색 선택
 *              required: fasle
 *              type: "string"
 *          responses:
 *              '200':
 *              description: A successful response
 */
app.get("/", async (req, res) => {
    const search_type = req.query.search_type;

    if (typeof search_type == "undefined") {
        // 처음 시작 페이지 (입력된 검색어가 없으므로 undefiend)
        if (req.session.user) {
            res.render("index", { results: "", user: req.session.user['id'] });
        } else if (req.session.admin) {
            res.render("index", { results: "", admin: req.session.admin['id'] });
        } else {
            res.render("index", { results: "" });
        }
    } else if (search_type == "road_search") {
        /* *************************
                주소명 검색
        ************************* */

        // 검색 필터 내용 가져오기
        const inputAddr = req.query.inputAddr;
        const inputType = req.query.inputType;
        const inputFilter = req.query.inputFilter;
        const addrFilter = req.query.addrFilter;

        let searchAddr;
        if (addrFilter === "lo") {
            // 주소 필터가 "-로" 단위일 때
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
            // 주소 필터가 "-구" 단위일 때
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
        
        // DB 검색에 사용할 필터링 문장 생성
        let conditions;
        if (inputFilter == "all") {
            // 검색 필터가 "전체보기"일 때
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
            // 검색 필터가 "소아과 보기"일 때
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

        // DB에서 병원 데이터 가져오기
        let results = await Hospitals.find(conditions);

        // index.ejs로 병원 데이터 내보내기
        if (results.length > 0) {
            // 병원 데이터가 있다면 DB로 받은 병원 데이터를 내보낸다
            if (req.session.user) {
                res.render("index", { results: results, user: req.session.user['id'] });
            } else if (req.session.admin) {
                res.render("index", { results: results, admin: req.session.admin['id'] });
            } else {
                res.render("index", { results: results });
            }
        } else {
            // 병원 데이터가 없다면 "일치하는 검색 결과가 없다"는 내용을 내보낸다
            if (req.session.user) {
                res.render("index", { results: '일치하는 검색 결과가 없습니다.', user: req.session.user['id'] });
            } else if (req.session.admin) {
                res.render("index", { results: '일치하는 검색 결과가 없습니다.', admin: req.session.admin['id'] });
            }else {
                res.render("index", { results: '일치하는 검색 결과가 없습니다.' });
            }
        }
    } else if (search_type == "name_search") {
        /* *************************
                병원명 검색
        ************************* */

        // 입력된 병원 이름 가져오기
        const hospital_name = req.query.hospital_name;

        // DB에서 병원 데이터 가져오기
        let hospitals = await Hospitals.find({ name: {$regex : hospital_name} });

        // index.ejs로 병원 데이터 내보내기
        if (hospitals.length > 0) {
            // 병원 데이터가 있다면 DB로 받은 병원 데이터를 내보낸다
            if (req.session.user) {
                res.render("index", { results: hospitals, user: req.session.user['id'] });
            } else if (req.session.admin) {
                res.render("index", { results: hospitals, admin: req.session.admin['id'] });
            } else {
                res.render("index", { results: hospitals });
            }
        } else {
            // 병원 데이터가 없다면 "일치하는 검색 결과가 없다"는 내용을 내보낸다
            if (req.session.user) {
                res.render("index", { results: '일치하는 검색 결과가 없습니다.', user: req.session.user['id'] });
            } else if (req.session.admin) {
                res.render("index", { results: '일치하는 검색 결과가 없습니다.', admin: req.session.admin['id'] });
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
        /* *************************
                회원가입
        ************************* */
        try {
            const salt = crypto.randomBytes(64).toString("base64");
            const hashed_password = crypto.pbkdf2Sync(req.body.createPassword, salt, 190481, 64, "sha512").toString("base64");

            let user = new Users();
            user.user_id = req.body.createId;
            user.user_salt = salt;
            user.user_hashedPassword = hashed_password;
            user.created_at = new Date();

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
        /* *************************
                로그인
        ************************* */
        const results = await Users.findOne({ user_id: req.body.inputId, is_withdrawn: false });

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
        /* *************************
                로그아웃
        ************************* */
        req.session.destroy((error) => { res.redirect("/"); });
    } else if (type == "report") {
        /* *************************
                회원의 병원신고 접수
        ************************* */
        let report = new Reports();
        report.writer_id = req.body.writer_id;
        report.hospital_id = req.body.hospital_id;

        report = await report.save();
        res.send(`<script>alert("신고가 접수되었습니다. 관리자 확인 후 신고횟수에 반영됩니다."); history.go(-1);</script>`);
    }
});

app.use("/admin", adminRouter);
app.use("/reviews", reviewsRouter);
app.use("/community", communityRouter);
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