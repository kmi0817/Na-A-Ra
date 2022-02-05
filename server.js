const express = require("express");
const request = require("request");
const mypageRouter = require('./routes/mypage');
const adminRouter = require("./routes/admin");
const Hospitals = require("./models/hospitals");
const Users = require("./models/users");
const methodOverride = require("method-override");
const http = require("http");
const crypto = require("crypto");

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false })); // enable to use req.body.(input field)

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

    if (typeof inputAddr == "undefined" || typeof inputType == "undefined" || typeof inputFilter == "undefined") {
        res.render("index", { results: "" });
    } else {
        console.log(`입력 주소: ${inputAddr}`);
        console.log(`병원종류: ${inputType}, 필터: ${inputFilter}`);
        
        let searchAddr;
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
        console.log(JSON.stringify(conditions));
        let results = await Hospitals.find(conditions).limit(20);

        // Send index.ejs data
        if (results.length > 0) {
            res.render("index", { results: results });
        } else {
            res.render("index", { results: '일치하는 검색 결과가 없습니다.' });
        }
    }
});

app.get("/test", (req, res) => {
    res.render("test");
})
app.post("/process/:type", async(req, res) => {
    const type = req.params.type;

    if (type == "signup") {
        try {
            const salt = crypto.randomBytes(64).toString("base64");
            console.log("typeof(salt): " + typeof(salt));
            const hashed_password = crypto.pbkdf2Sync(req.body.createPassword, salt, 190481, 64, "sha512").toString("base64");
            console.log(`salt: ${salt}, hashed: ${hashed_password}`);

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
                console.log("** 로그인OK : 세션 처리 필요");
                res.redirect("/");
            }
        } else {
            res.send(`<script>alert("일치하는 회원 정보가 없습니다."); history.go(-1);</script>`);
        }
    }

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


app.use('/mypage', mypageRouter);
app.use("/admin", adminRouter);

// web server
server.listen(3000, () => {
    // port: 3000 app success
    console.log("localhost:3000 OK");
})
// const server = app.listen(3000, () => {
//     // port: 3000 app success
//     console.log("localhost:3000 OK");
// })