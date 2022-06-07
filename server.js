const express = require("express");
const request = require("request");
const adminRouter = require("./routes/admin");
const reviewsRouter = require("./routes/reviews");
const communityRouter = require("./routes/community");
const mypageRouter = require("./routes/mypage");
const methodOverride = require("method-override");
const http = require("http");
const crypto = require("crypto");
const expressSession = require("express-session");
const ObjectId = require('mongodb').ObjectId;


//model
const Users = require("./models/users");
const Hospitals = require("./models/hospitals");
const Reports = require("./models/reports");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: false })); // enable to use req.body.(input field)
app.use(expressSession({
    secret: "secretKey",
    resave: true,
    saveUninitialized: true
}));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// views engine (convert ejs code to HTML)
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.engine("html", require("ejs").renderFile);

// other routes
app.use("/admin", adminRouter);
app.use("/reviews", reviewsRouter);
app.use("/community", communityRouter);
app.use("/mypage", mypageRouter);

const { swaggerUi, specs } = require("./swagger/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// routes
/**
 * @swagger
 * paths:
 *  /newapi:
 *      get:
 *          tags: [ 검색 ]
 *          summary: "Get main page"
 *          description: 주소명 검색 페이지
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
app.get("/newapi", async (req, res) => {
    const inputAddr = req.query.inputAddr;
    const inputType = req.query.inputType;
    const inputFilter = req.query.inputFilter;
    const addrFilter = req.query.addrFilter;
    const search_type = req.query.search_type;

    if (typeof inputAddr == "undefined" || typeof inputType == "undefined" || typeof inputFilter == "undefined") {
        if (req.session.user) {
            res.send({ results: "", user_id: req.session.user['id'], text: "유저긴 한데 결과 없음" });
        } else if (req.session.admin) {
            res.send({ results: "", admin_id: req.session.admin['id'], text: "관리자긴한데 결과 없음" });
        } else {
            res.send({ results: "", text: "아무것도 없음" });
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
                res.send({ results: results, user_id: req.session.user['id'], text: "결과, 관리자"});
            } else if (req.session.admin) {
                res.send({ results: results, admin_id: req.session.admin['id'], text: "결과, 유저" });
            } else {
                res.send({ results: results, text: "결과만" });
            }
        } else {
            if (req.session.user) {
                res.send({ results: "", user_id: req.session.user['id'], text: '일치하는 검색 결과가 없습니다.'});
            } else if (req.session.admin) {
                res.send({ results: "", admin_id: req.session.admin['id'], text: '일치하는 검색 결과가 없습니다.' });
            }else {
                res.send({ results: "", text: '일치하는 검색 결과가 없습니다.' });
            }
        }
    }
});

//병원명 검색
/**
 * @swagger
 * paths:
 *  /name-search:
 *      get:
 *          tags: [ 검색 ]
 *          summary: "Get main page"
 *          description: 병원명 검색 페이지
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
app.get("/name-search", async(req, res) => {
        // 입력된 병원 이름 가져오기
        const hospital_name = req.query.hospital_name;
        // DB에서 병원 데이터 가져오기
        let hospitals = await Hospitals.find({ name: {$regex : hospital_name} });

        // index.ejs로 병원 데이터 내보내기
        if (hospitals.length > 0) {
            // 병원 데이터가 있다면 DB로 받은 병원 데이터를 내보낸다
            if (req.session.user) {
                res.send({ results: hospitals, user: req.session.user['id'] });
            } else if (req.session.admin) {
                res.send({ results: hospitals, admin: req.session.admin['id'] });
            } else {
                res.send({ results: hospitals });
            }
        } else {
            // 병원 데이터가 없다면 "일치하는 검색 결과가 없다"는 내용을 내보낸다
            if (req.session.user) {
                res.send({ results: "", user: req.session.user['id'] });
            } else if (req.session.admin) {
                res.send({ results: "", admin: req.session.admin['id'] });
            }else {
                res.send({ results: "" });
            }
        }
});




//회원가입 로그인
app.post("/process/:type", async(req, res) => {
    const type = req.params.type;
    console.log(type)

    if (type == "signup") {
        try {
            const salt = crypto.randomBytes(64).toString("base64");
            const hashed_password = crypto.pbkdf2Sync(req.body.createPassword, salt, 190481, 64, "sha512").toString("base64");

            let user = new Users();
            user.user_id = req.body.createId;
            user.user_salt = salt;
            user.user_hashedPassword = hashed_password;
            user.created_at = new Date();
            user = await user.save();
            res.send({text: "success"});
        } catch (error) {
            if (error.code === 11000) {
                res.send({text: "exist"});
            } else {
                res.send({text: "error"});
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
                    req.session.user = {
                        id: results["_id"],
                        name: req.body.inputId,
                        authorized: true
                    };
                }
                res.send({text: "로그인 성공"});
            }
        } else {
            res.send({results: "", text: "일치하는 회원 정보가 없습니다."});
        }
    } else if (type == "logout") {
        req.session.destroy((error) => { res.send({text: "로그아웃"}); });
    } else if (type == "change-password") {
        const user = await Users.findOne({ user_id: req.body.input_id });
        if (user != null) {
            const computed_password = crypto.pbkdf2Sync(req.body.old_password, user["user_salt"], 190481, 64, "sha512").toString("base64");
            if (computed_password === user["user_hashedPassword"]) {
                const salt = crypto.randomBytes(64).toString("base64");
                const hashed_password = crypto.pbkdf2Sync(req.body.new_password, salt, 190481, 64, "sha512").toString("base64");

                await Users.findOneAndUpdate({ user_id: req.body.input_id }, { user_salt: salt, user_hashedPassword: hashed_password });
                res.send({text: "성공"});
            } else {
                res.send({text: "일치하는 회원 정보가 없습니다."});
            }
        } else {
            res.send({text: "일치하는 회원 정보가 없습니다."});
        }
    } else if (type == "report") {
        let report = new Reports();
        report.writer_id = req.body.writer_id;
        report.hospital_id = req.body.hospital_id;

        report = await report.save();
        res.send({text: "신고가 접수되었습니다. 관리자 확인 후 신고횟수에 반영됩니다."});
    }
});


/**
 * @swagger
 * paths:
 *  /signup:
 *      post:
 *          tags: [ 처리 ]
 *          summary: "Create a user in database"
 *          description: 회원가입 처리
 *          parameters:
 *          -   name: "createId"
 *              in: "formData"
 *              description: 입력 아이디
 *              required: true
 *              type: "string"
 *          -   name: "createPassword"
 *              in: "formData"
 *              description: 입력 비밀번호
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
 app.post("/signup", async(req, res) => {
    try {
        const salt = crypto.randomBytes(64).toString("base64");
        const hashed_password = crypto.pbkdf2Sync(req.body.createPassword, salt, 190481, 64, "sha512").toString("base64");

        let user = new Users();
        user.user_id = req.body.createId;
        user.user_salt = salt;
        user.user_hashedPassword = hashed_password;
        user.created_at = new Date();

        user = await user.save();
        res.send({text: "success"});
    } catch (error) {
        if (error.code === 11000) {
            res.send({text: "exist"});
        } else {
            res.send({text: "error"});
            console.log("*** DB 저장 문제: " + error);
        }
    }
});

/**
 * @swagger
 * paths:
 *  /login:
 *      post:
 *          tags: [ 처리 ]
 *          summary: "Login"
 *          description: 로그인 세션 생성
 *          parameters:
 *          -   name: "inputId"
 *              in: "formData"
 *              description: 입력 아이디
 *              required: true
 *              type: "string"
 *          -   name: "inputPassword"
 *              in: "formData"
 *              description: 입력 비밀번호
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
 app.post("/login", async(req, res) => {
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
            res.send({text: "로그인 성공"});
        }
    } else {
        res.send({results: "", text: "일치하는 회원 정보가 없습니다."});
    }
});

/**
 * @swagger
 * paths:
 *  /logout:
 *      delete:
 *          tags: [ 처리 ]
 *          summary: "Logout"
 *          description: 로그인 세션 파괴
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
app.delete("/logout", async(req, res) => {
    req.session.destroy((error) => { res.send({text: "로그아웃"}); });
});

/**
 * @swagger
 * paths:
 *  /report:
 *      post:
 *          tags: [ 처리 ]
 *          summary: "Report a hospital in a databse"
 *          description: 회원의 병원 신고를 접수함
 *          parameters:
 *          -   name: "writer_id"
 *              in: "formData"
 *              description: 신고하는 회원 아이디
 *              required: true
 *              type: "string"
 *          -   name: "hospital_id"
 *              in: "formData"
 *              description: 신고하는 병원의 ObjectId
 *              required: true
 *              type: "string"
 *          responses:
 *              "200":
 *                  description: A successful response
 *              "400":
 *                  description: Not Found
 */
app.post("/report", async(req, res) => {
    let report = new Reports();
    report.writer_id = req.body.writer_id;
    report.hospital_id = req.body.hospital_id;

    report = await report.save();
    res.send({text: "신고가 접수되었습니다. 관리자 확인 후 신고횟수에 반영됩니다."});
});



app.get("/openapi", (req, res) => {
    // OpenAPI
    var url = 'http://apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1';
    const myServiceKey = "JtIV8PCzx8%2BLWnp%2F07kxb%2FL4%2Fglq9W6WGZN2AQwOBG%2B9fIRQEA%2F12X%2F2ONTYaEFLDPxdBzqz1CWa6%2FRDwcMxRA%3D%3D";
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + myServiceKey; /* Service Key*/
    queryParams += '&' + encodeURIComponent('sidoCd') + '=' + encodeURIComponent("110000");

    request({
        // 응답표준은 XML이며, JSON을 요청할 경우 “&_type=json”을 추가하여 요청합니다.
        url: url + queryParams + "&_type=json",
        method: "GET"
    }, (err, response, body) => {
        console.log(`Status: ${response.statusCode}`);
        parsed_body = JSON.parse(body);
        hospitals_list = parsed_body["response"]["body"]["items"]["item"];

        res_list = []
        hospitals_list.forEach((hospital, index) => {
            res_list.push({
                "인덱스": index,
                "emdongNm": hospital["emdongNm"],
                "병원명": hospital["yadmNm"],
                "주소": hospital["addr"],
                "종별코드명": hospital["clCdNm"],
                "전화번호": hospital["telno"],
                "의사총수": hospital["drTotCnt"],
                "좌표": [hospital["XPos"], hospital["YPos"]],
                "시도코드": hospital["sidoCd"],
                "시도명": hospital["sidoCdNm"]
            })
        });

        res.send(JSON.stringify(res_list, null, 4));
    }
    );
});

app.get("/checkUser", (req, res) => {
    if (req.session.admin) {
        res.send({admin_id: req.session.admin['name'], admin_id_id: req.session.admin['id'], user_id: "", user_id_id: ""});
    }
    else if (req.session.user) {
        res.send({user_id: req.session.user['name'], user_id_id: req.session.user['id'], admin_id: "", admin_id_id: ""});
    }
    else {
        res.send({user_id: "", user_id_id: "", admin_id: "", admin_id_id: ""});
    }//
})







// web server
const server = app.listen(port, () => {
    // port: 3000 app success
    console.log("localhost on port: " + port);
})