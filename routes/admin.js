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
    const results = await Hospitals.find();
    res.render("admin/hospitals", { results: results });
});

router.get("/hospitals/:id", async(req, res) => {
    const results = await Hospitals.findOne({ _id: req.params.id });
    if (results == null)
        res.redirect("/admin");

    res.render("admin/hospital", { results: results });
});

router.delete("/hospitals/:id", async(req, res) => {
    await Hospitals.findByIdAndDelete({ _id: req.params.id });
    res.redirect("/admin/hospitals");
});

router.post("/hospitals", async (req, res) => {
    await Hospitals.deleteMany({});

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
    res.redirect("/admin/hospitals");
});

module.exports = router