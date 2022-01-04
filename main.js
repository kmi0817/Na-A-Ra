var http = require("http");
var fs = require("fs");

var app = http.createServer((req, res) => {
    var url = req.url;
    console.log(url);

    if (url == "/") {
        url = "/index.html";
    } else if (url == "/favicon.ico") {
        return res.writeHead(404);
    }

    res.writeHead(200);
    res.end(fs.readFileSync(__dirname + url));
});

app.listen(3000);