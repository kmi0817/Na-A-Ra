const express = require("express");
const request = require("request");
const mypageRouter = require('./routes/mypage');
const adminRouter = require("./routes/admin");
const Hospitals = require("./models/hospitals");
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
    const symptom_level = req.query.symptom_level;
    const symptom = req.query.symptom;

    if (typeof symptom_level == "undefined" || typeof symptom == "undefined") {
        res.render("index", { results: "" });
    } else {
        console.log(`증상 정도: ${symptom_level}, 증상: ${symptom}`);

        /*
            0 - 내과
            1 - 안과
            2 - 정형외과
            3 - 외과
            4 - 치과
        */
        let rules = {
            0: [ "머리", "울려", "두통", "골", "코", "막힘", "막혀", "콧물", "훌쩍" ],
            1: [ "눈", "충혈", "시력", "흐릿" ],
            2: [ "뼈", "골절", "삐었", "금", "절뚝", "뚝", "관절", "무릎", "손목", "발목" ],
            3: [ "항문", "상처", "꼬매" ],
            4: [ "치아", "이", "치통", "썩었", "썩음", "썩어" ]
        }
        let response = {
            0: { zipCd: "2070", name: { $regex: "내과" } },
            1: { zipCd: "2070", name: { $regex: "안과" } },
            2: { zipCd: "2070", name: { $regex: "정형외과"} },
            3: { zipCd: "2070", $and : [{name : {$regex : "외과"}}, {name : {$not : {$regex : "정형"}}}] },
            4: { zipCd: "2050", name: { $regex: "의원" } }
        }
        let results;
        for (rule in rules) {
            flag = false
            let words = rules[rule];
            for (word in words) {
                if (symptom.includes(words[word])) {
                    flag = true
                    break
                }
            }
            if (flag) {
                results = await Hospitals.find(response[rule]).limit(20);
            }
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
server.listen(3000, () => {
    // port: 3000 app success
    console.log("localhost:3000 OK");
})
// const server = app.listen(3000, () => {
//     // port: 3000 app success
//     console.log("localhost:3000 OK");
// })