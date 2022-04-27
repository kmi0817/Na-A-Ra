const express = require("express");
const mongoose = require("mongoose");
const request = require("request-promise-native");
const Hospitals = require("../models/hospitals");
const Comments = require("../models/comments");
const Users = require("../models/users");
const Reports = require("../models/reports");
const router = express.Router();

mongoose.connect("mongodb://localhost/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

router.get("/", async (req, res) => {
    if (req.session.admin) {
        const users = await Users.find().sort({ _id: -1 });
        const hospitals = await Hospitals.find({ reports_cnt: { $ne: 0 }}, { sgguCdNm: 1, sidoCdNm: 1, reports_cnt: 1, name: 1 }).sort({ reports_cnt: -1 });
        const reports = await Reports.find({ is_confirmed: false }).populate({ path: "writer_id", select: { user_id: 1 } }).populate({ path: "hospital_id", select: { sgguCdNm: 1, sidoCdNm: 1, name: 1 }});
        res.render("admin/index", { users: users, hospitals: hospitals, reports: reports });
    } else {
        res.status(404).send("not found");
    }
});

router.get("/member/:id", async(req, res) => {
    if (req.session.admin) {
        const comments_results = await Comments.find({ writer_id: req.params.id }).populate({ path: "hospital_id", select: { name: 1 } }).sort({ _id: -1 });
        const reports_results = await Reports.find({ writer_id: req.params.id }).populate({ path: "hospital_id", select: { name: 1 }});
        res.render("admin/member", { comments_results: comments_results, reports_results: reports_results });
    } else {
        res.status(404).send("not found");
    }
});

router.post("/report-confirmed", async(req, res) => {
    if (req.session.admin) {
        await Reports.findByIdAndUpdate(req.body.report_id, { is_confirmed: true });
        const hospital = await Hospitals.findById(req.body.hospital_id, { reports_cnt: 1 });
        await Hospitals.findByIdAndUpdate(req.body.hospital_id, { reports_cnt: hospital["reports_cnt"] + 1 });
        res.redirect("/admin");
    } else {
        res.status(404).send("not found");
    }
});

router.get("/json", async (req, res) => {
    if (req.session.admin) {
        const results = await Hospitals.find().limit(50).sort({name: 1});
        res.send(results);
    } else {
        res.status(404).send("not found");
    }
})

router.get("/hospitals", async (req, res) => {
    if (req.session.admin) {
        const results = await Hospitals.find().limit(50).sort({name: 1});
        res.render("admin/hospitals", { results: results });
    } else {
        res.status(404).send("not found");
    }
});

router.get("/hospitals/:id", async(req, res) => {
    if (req.session.admin) {
        const results = await Hospitals.findOne({ _id: req.params.id });
        if (results == null)
            res.redirect("/admin");
    
        res.render("admin/hospital", { results: results });
    } else {
        res.status(404).send("not found");
    }
});

router.delete("/hospitals/:id", async(req, res) => {
    if (req.session.admin) {
        await Hospitals.findByIdAndDelete({ _id: req.params.id });
        res.redirect("/admin/hospitals");
    } else {
        res.status(404).send("not found");
    }
});

router.post("/hospitals/:zipCd", async (req, res) => {
    if (req.session.admin) {
        const _url = 'http://apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1';
        const myServiceKey = "JtIV8PCzx8%2BLWnp%2F07kxb%2FL4%2Fglq9W6WGZN2AQwOBG%2B9fIRQEA%2F12X%2F2ONTYaEFLDPxdBzqz1CWa6%2FRDwcMxRA%3D%3D";
        let queryParams = '?' + encodeURIComponent('serviceKey') + '='  + myServiceKey;
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
    
        /* 분류코드 */
        const zipCd = String(req.params.zipCd);
        let totalCount;
        if (zipCd == "2010") { totalCount = 365; await Hospitals.deleteMany({zipCd: zipCd}); } // 종합병원
        else if (zipCd == "2030") { totalCount = 1397; await Hospitals.deleteMany({zipCd: zipCd}); } // 병원
        else if (zipCd == "2040") { totalCount = 1463; await Hospitals.deleteMany({zipCd: zipCd}); } // 요양병원
        else if (zipCd == "2050") { totalCount = 18860; await Hospitals.deleteMany({zipCd: zipCd}); } // 치과
        else if (zipCd == "2060") { totalCount = 15025; await Hospitals.deleteMany({zipCd: zipCd}); } // 한방
        else if (zipCd == "2070") { totalCount = 33962; await Hospitals.deleteMany({zipCd: zipCd}); } // 의원
        else if (zipCd == "2080") { totalCount = 3483; await Hospitals.deleteMany({zipCd: zipCd}); } // 보건기관
        else if (zipCd == "2090") { totalCount = 16; await Hospitals.deleteMany({zipCd: zipCd}); }// 조산원
        else { console.log("*** Error - no matching code"); }
    
        queryParams += '&' + encodeURIComponent('zipCd') + '=' + encodeURIComponent(zipCd);
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(totalCount);
        queryParams += "&_type=json"; // To change XML (default response data type) to JSON, append "&_type=json"
        const options = {
            url: _url + queryParams,
            method: "GET"
        }
    
        const response = await request(options); // request to OpenAPI
    
        console.log(`zipCd= ${zipCd}`);
        console.log("totalCount= " + JSON.stringify(JSON.parse(response)["response"]["body"]["totalCount"]));
    
        results = JSON.parse(response)["response"]["body"]["items"]["item"] // extract hospital data only
    
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
            hospital.zipCd = zipCd;
    
            try {
                hospital = await hospital.save();
            } catch (error) {
                console.log("DB 저장 문제: " + error);
            }
        });
        res.redirect("/admin/hospitals");
    } else {
        res.status(404).send("not found");
    }
});

module.exports = router