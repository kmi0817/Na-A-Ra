const express = require("express");
const mongoose = require("mongoose");
const request = require("request-promise-native");
const Hospitals = require("./../models/hospitals");
const router = express.Router();

mongoose.connect("mongodb://localhost/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.get("/", (req, res) => {
    res.render("admin/index");
});

router.get("/hospitals", async (req, res) => {
    // res.send("hospital data from DB");
    const _url = 'http://apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1';
    const myServiceKey = "JtIV8PCzx8%2BLWnp%2F07kxb%2FL4%2Fglq9W6WGZN2AQwOBG%2B9fIRQEA%2F12X%2F2ONTYaEFLDPxdBzqz1CWa6%2FRDwcMxRA%3D%3D";
    let queryParams = '?' + encodeURIComponent('serviceKey') + '='  + myServiceKey;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('2');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('5');
    queryParams += "&_type=json"; // To change XML (default response data type) to JSON, append "&_type=json"

    const options = {
        url: _url + queryParams,
        method: "GET"
    }

    const response = await request(options);
    const results = JSON.parse(response)["response"]["body"]["items"]["item"]
    
    results.forEach((result) => {
        console.log(result);
    })

    res.send(JSON.stringify(results, null, 4));
});

router.post("/hospitals", async (req, res) => {
    const _url = 'http://apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1';
    const myServiceKey = "JtIV8PCzx8%2BLWnp%2F07kxb%2FL4%2Fglq9W6WGZN2AQwOBG%2B9fIRQEA%2F12X%2F2ONTYaEFLDPxdBzqz1CWa6%2FRDwcMxRA%3D%3D";
    let queryParams = '?' + encodeURIComponent('serviceKey') + '='  + myServiceKey;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('2');
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('5');
    queryParams += "&_type=json"; // To change XML (default response data type) to JSON, append "&_type=json"

    const options = {
        url: _url + queryParams,
        method: "GET"
    }

    const response = await request(options);
    results = JSON.parse(response)["response"]["body"]["items"]["item"]

    results.forEach( async (result) => {
        let hospital = new Hospitals();
        hospital.addr = result.addr;
        hospital.type_code = result.clCdNm;
        hospital.cmdcGdrCnt = result.cmdcGdrCnt;
        hospital.cmdcIntnCnt = result.cmdcIntnCnt;
        hospital.cmdcResdntCnt = result.cmdcResdntCnt;
        hospital.cmdcSdrCnt = result.cmdcSdrCnt;
        hospital.detyGdrCnt = result.detyGdrCnt;
        hospital.detyIntnCnt = result.detyIntnCnt;
        hospital.detyResdntCnt = result.detyResdntCnt;
        hospital.detySdrCnt = result.detySdrCnt;
        hospital.drTotCnt = result.drTotCnt;
        hospital.estbDd = result.estbDd;
        hospital.hospUrl = result.hospUrl;
        hospital.mdeptGdrCnt = result.mdeptGdrCnt;
        hospital.mdeptIntnCnt = result.mdeptIntnCnt;
        hospital.mdeptResdntCnt = result.mdeptResdntCnt;
        hospital.mdeptSdrCnt = result.mdeptSdrCnt;
        hospital.postNo = result.postNo;
        hospital.sgguCdNm = result.sgguCdNm;
        hospital.sidoCdNm = result.sidoCdNm;
        hospital.telno = result.telno;
        hospital.coord = [result.XPos, result.YPos];
        hospital.name = result.yadmNm;

        try {
            hospital = await hospital.save();
        } catch (error) {
            console.log("DB 저장 문제: " + error);
        }
    });
    res.redirect("/admin");
});

module.exports = router