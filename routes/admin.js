const express = require("express");
const mongoose = require("mongoose");
const request = require("request-promise-native");
const Hospitals = require("./../models/hospitals");
const router = express.Router();

mongoose.connect("mongodb://localhost/app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB OK");
});

router.get("/", (req, res) => {
    res.render("admin/index");
});

router.get("/json", async (req, res) => {
    const results = await Hospitals.find();
    res.send(results);
})

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

router.post("/hospitals/:dgsbjtCd", async (req, res) => {
    await Hospitals.deleteMany({}); // delete existed data

    const _url = 'http://apis.data.go.kr/B551182/hospInfoService1/getHospBasisList1';
    const myServiceKey = "JtIV8PCzx8%2BLWnp%2F07kxb%2FL4%2Fglq9W6WGZN2AQwOBG%2B9fIRQEA%2F12X%2F2ONTYaEFLDPxdBzqz1CWa6%2FRDwcMxRA%3D%3D";
    let queryParams = '?' + encodeURIComponent('serviceKey') + '='  + myServiceKey;
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');

    /* 진료과목코드 */
    const dgsbjtCd = String(req.params.dgsbjtCd);
    let totalCount;
    if (dgsbjtCd == "00") {
        totalCount = 0; // 일반의
    } else if (dgsbjtCd == "01") {
        totalCount = 23054; // 내과
    } else if (dgsbjtCd == "02") {
        totalCount = 5264; // 신경과
    } else if (dgsbjtCd == "03") {
        totalCount = 3458; // 정신건강의학과
    } else if (dgsbjtCd == "04") {
        totalCount = 9225; // 외과
    } else if (dgsbjtCd == "05") {
        totalCount = 11640; // 정형외과
    } else if (dgsbjtCd == "06") {
        totalCount = 6946; // 신경외과
    } else if (dgsbjtCd == "07") {
        totalCount = 1103; // 흉부외과
    } else if (dgsbjtCd == "08") {
        totalCount = 4838; // 성형외과
    } else if (dgsbjtCd == "09") {
        totalCount = 7013; // 마취통증의학과
    } else if (dgsbjtCd == "10") {
        totalCount = 4168; // 산부인과
    }
    
    else if (dgsbjtCd == "11") {
        totalCount = 15342; // 소아청소년과
    } else if (dgsbjtCd == "12") {
        totalCount =4310; // 안과
    } else if (dgsbjtCd == "13") {
        totalCount = 12073; // 이비인후과
    } else if (dgsbjtCd == "14") {
        totalCount =16344; // 피부과
    } else if (dgsbjtCd == "15") {
        totalCount =8140; // 비뇨의학과
    } else if (dgsbjtCd == "16") {
        totalCount =3710; // 영상의학과
    } else if (dgsbjtCd == "17") {
        totalCount =307; // 방사선종양학과
    } else if (dgsbjtCd == "18") {
        totalCount =1002; // 병리과
    } else if (dgsbjtCd == "19") {
        totalCount =1485; // 진단검사의학과
    } else if (dgsbjtCd == "20") {
        totalCount =310; // 결핵과
    } else if (dgsbjtCd == "21") {
        totalCount = 6425; // 재활의학과
    } else if (dgsbjtCd == "22") {
        totalCount = 231; // 핵의학과
    } else if (dgsbjtCd == "23") {
        totalCount = 9348; // 가정의학과
    } else if (dgsbjtCd == "24") {
        totalCount = 797; // 응급의학과
    }
    else if (dgsbjtCd == "25") {
        totalCount = 412;  // 직업환경의학과
    } else if (dgsbjtCd == "26") {
        totalCount = 374; // 예방의학과
    }
    
    else if (dgsbjtCd == "50") {
        totalCount = 7799; // 구강악안면외과
    } else if (dgsbjtCd == "51") {
        totalCount = 8357; // 치과보철과
    } else if (dgsbjtCd == "52") {
        totalCount = 7201; // 치아교정과
    } else if (dgsbjtCd == "53") {
        totalCount =7830; // 소아치과
    } else if (dgsbjtCd == "54") {
        totalCount = 8165; // 치주과
    } else if (dgsbjtCd == "55") {
        totalCount = 7918; // 치과보존과
    } else if (dgsbjtCd == "56") {
        totalCount = 7261; // 구강내과
    } else if (dgsbjtCd == "57") {
        totalCount = 6398; // 영상치의학과
    } else if (dgsbjtCd == "58") {
        totalCount = 4931; // 구강병리과
    } else if (dgsbjtCd == "59") {
        totalCount = 7298; // 예방치과
    } else if (dgsbjtCd == "61") {
        totalCount = 2116; // 통합치의학과
    }
    
    else if (dgsbjtCd == "80") {
        queryParams += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent('80'); // 한방내과
    } else if (dgsbjtCd == "81") {
        queryParams += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent('81'); // 한방부인과
    } else if (dgsbjtCd == "82") {
        queryParams += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent('82'); // 한방소아과
    } else if (dgsbjtCd == "83") {
        queryParams += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent('83'); // 한방안이비인후피부과
    } else if (dgsbjtCd == "84") {
        queryParams += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent('84'); // 한방신경정신과
    } else if (dgsbjtCd == "85") {
        queryParams += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent('85'); // 침구과
    } else if (dgsbjtCd == "86") {
        queryParams += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent('86'); // 한방재활의학과
    } else if (dgsbjtCd == "87") {
        queryParams += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent('87'); // 사상체질과
    } else if (dgsbjtCd == "88") {
        queryParams += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent('88'); // 한방응급
    } else {
        console.log("*** Error - no matching code");
    }

    // queryParams += '&' + encodeURIComponent('dgsbjtCd') + '=' + encodeURIComponent(dgsbjtCd);
    queryParams += "&_type=json"; // To change XML (default response data type) to JSON, append "&_type=json"
    const options = {
        url: _url + queryParams,
        method: "GET"
    }

    const response = await request(options); // request to OpenAPI
    res.send(JSON.stringify(JSON.parse(response)["response"]["body"]["totalCount"]));
    
    // results = JSON.parse(response)["response"]["body"]["items"]["item"] // extract hospital data only

    // results.forEach( async (result) => {
    //     let hospital = new Hospitals();
    //     hospital.addr = result.addr;
    //     hospital.type_code = result.clCdNm;
    //     hospital.cmdcGdrCnt = result.cmdcGdrCnt;
    //     hospital.cmdcIntnCnt = result.cmdcIntnCnt;
    //     hospital.cmdcResdntCnt = result.cmdcResdntCnt;
    //     hospital.cmdcSdrCnt = result.cmdcSdrCnt;
    //     hospital.detyGdrCnt = result.detyGdrCnt;
    //     hospital.detyIntnCnt = result.detyIntnCnt;
    //     hospital.detyResdntCnt = result.detyResdntCnt;
    //     hospital.detySdrCnt = result.detySdrCnt;
    //     hospital.drTotCnt = result.drTotCnt;
    //     hospital.estbDd = result.estbDd;
    //     hospital.hospUrl = result.hospUrl;
    //     hospital.mdeptGdrCnt = result.mdeptGdrCnt;
    //     hospital.mdeptIntnCnt = result.mdeptIntnCnt;
    //     hospital.mdeptResdntCnt = result.mdeptResdntCnt;
    //     hospital.mdeptSdrCnt = result.mdeptSdrCnt;
    //     hospital.postNo = result.postNo;
    //     hospital.sgguCdNm = result.sgguCdNm;
    //     hospital.sidoCdNm = result.sidoCdNm;
    //     hospital.telno = result.telno;
    //     hospital.coord = [result.XPos, result.YPos];
    //     hospital.name = result.yadmNm;

    //     try {
    //         hospital = await hospital.save();
    //     } catch (error) {
    //         console.log("DB 저장 문제: " + error);
    //     }
    // });
    // res.redirect("/admin/hospitals");
});

module.exports = router