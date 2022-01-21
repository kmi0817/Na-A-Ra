const express = require("express");
const request = require("request");
const mypageRouter = require('./routes/mypage');
const adminRouter = require("./routes/admin");
const Hospitals = require("./models/hospitals");
const methodOverride = require("method-override");
const app = express();

app.use(express.urlencoded({ extended: false })); // enable to use req.body.(input field)

// views engine (convert ejs code to HTML)
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.engine("html", require("ejs").renderFile);

// routes
app.get("/", async (req, res) => {
    const symptom_level = req.query.symptom_level;
    const symptom = req.query.symptom;

    if (typeof symptom_level == "undefined" || typeof symptom == "undefined") {
        res.render("index", { results: "" });
    } else {
        console.log(`증상 정도: ${symptom_level}, 증상: ${symptom}`);

        // Read hospital data from DB
        let results;
        if (symptom === "head") {

        } else if (symptom === "eye") {

        } else if (symptom === "bone") {

        } else if (symptom === "nose") {

        } else if (symptom === "tooth") {
            results = await Hospitals.find({
                "zipCd": "2050", // 치과
                "name": { $regex: "의원" },
                "sidoCdNm": "경기", // Temp
            }).limit(20).sort({ "detySdrCnt": -1 });
        }

        // Send index.ejs data
        if (typeof results != "undefined") {
            res.render("index", { results: results });
        } else {
            res.render("index", { results: 'no' });
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
const server = app.listen(3000, () => {
    // port: 3000 app success
    console.log("localhost:3000 OK");
})