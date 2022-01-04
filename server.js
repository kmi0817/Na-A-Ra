const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");
const app = express();

// web server
const server = app.listen(3000, () => {
    // port: 3000 app success
    console.log("localhost:3000 OK");
})
// views (HTML)
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
// routes
app.get("/", (req, res) => {
    // req.query 객체에 input 내용 있음
    var sido = req.query.sidoCdNm;
    if (sido) {
        var url = 'http://apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1';
        const myServiceKey = "JtIV8PCzx8%2BLWnp%2F07kxb%2FL4%2Fglq9W6WGZN2AQwOBG%2B9fIRQEA%2F12X%2F2ONTYaEFLDPxdBzqz1CWa6%2FRDwcMxRA%3D%3D";
        var queryParams = '?' + encodeURIComponent('serviceKey') + '='  + myServiceKey; /* Service Key*/
        queryParams += '&' + encodeURIComponent('sidoCdNm') + '=' + encodeURIComponent(sido);

        res_list = []
        request({
            // 응답표준은 XML이며, JSON을 요청할 경우 “&_type=json”을 추가하여 요청합니다.
            url: url + queryParams + "&_type=json",
            method: "GET"
        }, (err, response, body) => {
            parsed_body = JSON.parse(body);
            hospitals_list = parsed_body["response"]["body"]["items"]["item"];
    
            res_list = []
            hospitals_list.forEach((hospital, index) => {
                res_list.push({
                    "인덱스": index,
                    "병원명": hospital["yadmNm"],
                    "주소": hospital["addr"],
                    "종별코드명": hospital["clCdNm"],
                    "전화번호": hospital["telno"],
                    "의사총수": hospital["drTotCnt"],
                    "좌표": [hospital["XPos"], hospital["YPos"]]
                })
            });
    
            res.send(JSON.stringify(res_list, null, 4));
        }
        );
        res.send(JSON.stringify(res_list, null, 4));
    } else {
        res.render("index.html");
    }
});

app.get("/openapi", (req, res) => {
    // OpenAPI
    var url = 'http://apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1';
    const myServiceKey = "JtIV8PCzx8%2BLWnp%2F07kxb%2FL4%2Fglq9W6WGZN2AQwOBG%2B9fIRQEA%2F12X%2F2ONTYaEFLDPxdBzqz1CWa6%2FRDwcMxRA%3D%3D";
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='  + myServiceKey; /* Service Key*/
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


// // crawling - collect HTML
// const getHTML = async() => {
//     try {
//         return await axios.get("https://www.hira.or.kr/rd/hosp/getHospList.do?pgmid=HIRAA030002000000&ykiho=JDQ4MTYyMiM1MSMkMiMkMCMkMDAkNDgxOTYxIzExIyQxIyQ3IyQ5MiQ0NjEwMDIjNjEjJDEjJDAjJDgz");
//     } catch(error) {
//         console.error(error);
//     }
// }
// // crawling - Parsing
// const parsing = async() => {
//     const html = await getHTML();
//     const $ = cheerio.load(html.data); // load - get HTML
//     const $hospital_info = $(".tbl_default");

//     let info = [];
//     $hospital_info.each((id, node) => {
//         info.push({
//             doctor: $(node).find(".txtL").text(),
//             major: $(node).find(".list_tbl").text()
//         })
//     });

//     console.log(info);
// }

// // caller
// parsing();