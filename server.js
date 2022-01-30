const express = require("express");
const request = require("request");
const adminRouter = require("./routes/admin");
const Hospitals = require("./models/hospitals");
const methodOverride = require("method-override");
const http = require("http");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false })); // enable to use req.body.(input field)

// views engine (convert ejs code to HTML)
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.engine("html", require("ejs").renderFile);

// admin routes
app.use("/admin", adminRouter);

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







app.get("/testapi", async (req, res) => {
    const symptom_level = req.query.symptom_level;
    const symptom = req.query.symptom;

    if (typeof symptom_level != "undefined" || typeof symptom != "undefined") {
        console.log(`증상 정도: ${symptom_level}, 증상: ${symptom}`);
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

        res.send(results);
    }
});


// web server
const server = app.listen(port, () => {
    // port: 3000 app success
    console.log("localhost on port: " + port);
})