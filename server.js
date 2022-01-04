const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

// web server
const server = app.listen(3000, () => {
    // port: 3000 app success
    console.log("localhost:300 OK");
})
// views (HTML)
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
// routes
app.get("/", (req, res) => {
    res.render("index.html");
})

// crawling - collect HTML
const getHTML = async() => {
    try {
        return await axios.get("https://www.hira.or.kr/rd/hosp/getHospList.do?pgmid=HIRAA030002000000&ykiho=JDQ4MTYyMiM1MSMkMiMkMCMkMDAkNDgxOTYxIzExIyQxIyQ3IyQ5MiQ0NjEwMDIjNjEjJDEjJDAjJDgz");
    } catch(error) {
        console.error(error);
    }
}
// crawling - Parsing
const parsing = async() => {
    const html = await getHTML();
    const $ = cheerio.load(html.data); // load - get HTML
    const $hospital_info = $(".tbl_default");

    let info = [];
    $hospital_info.each((id, node) => {
        info.push({
            doctor: $(node).find(".txtL").text(),
            major: $(node).find(".list_tbl").text()
        })
    });

    console.log(info);
}

// caller
parsing();