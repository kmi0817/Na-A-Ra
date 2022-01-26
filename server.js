const express = require("express");
const request = require("request");
const mypageRouter = require('./routes/mypage');
const adminRouter = require("./routes/admin");
const Hospitals = require("./models/hospitals");
const Users = require("./models/users");
const methodOverride = require("method-override");
const http = require("http");

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
    const inputZipCd = req.query.inputZipCd;
    const inputFilter = req.query.inputFilter;

    if (typeof inputAddr == "undefined" || typeof inputZipCd == "undefined" || typeof inputFilter == "undefined") {
        res.render("index", { results: "" });
    } else {
        console.log(`입력 주소: ${inputAddr}`);
        console.log(`병원종류: ${inputZipCd}, 필터: ${inputFilter}`);
        
        let searchAddr;
        if (inputAddr.includes("서울")) {
            let listAddr = inputAddr.split(" ");
            let road = listAddr[2].substr(0, listAddr[2].indexOf("로") + 1);

            searchAddr = `${listAddr[0]}특별시 ${listAddr[1]} ${road}`;
            console.log(searchAddr);
        } else if (inputAddr.includes("인천")  || inputAddr.includes("부산") || inputAddr.includes("울산") || inputAddr.includes("대구") || inputAddr.includes("광주") || inputAddr.includes("대전")) {
            let listAddr = inputAddr.split(" ");
            searchAddr = `${listAddr[0]}광역시 ${listAddr[1]} ${listAddr[2]}`;
            console.log(searchAddr);
        } else {
            let listAddr = inputAddr.split(" ");
            let road = listAddr[3].substr(0, listAddr[3].indexOf("로") + 1);
            
            searchAddr = `${listAddr[0]}도 ${listAddr[1]} ${listAddr[2]} ${road}`;
            console.log(searchAddr);
        }

        let conditions = { zipCd: inputZipCd, addr: {$regex: searchAddr}}
        let results = await Hospitals.find(conditions).limit(20);

        // Send index.ejs data
        if (typeof results != "undefined") {
            res.render("index", { results: results });
        } else {
            res.render("index", { results: 'no' });
        }
    }
});

app.post("/process/:type", async(req, res) => {
    const type = req.params.type;

    if (type == "signup") {
        let user = new Users();
        user.user_id = req.body.createId;
        user.user_password = req.body.createPassword;

        try {
            user = await user.save();
        } catch (error) {
            console.log("*** DB 저장 문제: " + error);
        }

    } else if (type == "login") {
        const results = await Users.findOne({ user_id: req.body.inputId });

        if (results != null && results['user_password'] == req.body.inputPassword) {
            console.log("** 로그인OK : 세션 처리 필요");
        }
    }

    res.redirect("/");
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