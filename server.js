const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");
const { response } = require("express");
const { urlencoded } = require("body-parser");
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
    res.render("index.html");
})

app.get("/openapi", (req, res) => {
    // OpenAPI
    var url = 'http://apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=JtIV8PCzx8%2BLWnp%2F07kxb%2FL4%2Fglq9W6WGZN2AQwOBG%2B9fIRQEA%2F12X%2F2ONTYaEFLDPxdBzqz1CWa6%2FRDwcMxRA%3D%3D'; /* Service Key*/

    request({
        // 응답표준은 XML이며, JSON을 요청할 경우 “&_type=json”을 추가하여 요청합니다.
        url: url + queryParams + "&_type=json",
        method: "GET"
    }, (err, response, body) => {
        console.log(`Status: ${response.statusCode}`);
        console.log(`Headers: ${JSON.stringify(response.headers)}`);
        hospitals = JSON.parse(body);
        res.send(hospitals);
    }
    );
})


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