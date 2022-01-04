const express = require("express")
const app = express();

const server = app.listen(3000, () => {
    // port: 3000 app success
    console.log("localhost:300 OK");
})

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.get("/", (req, res) => {
    res.render("index.html");
})