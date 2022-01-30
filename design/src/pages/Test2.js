import React, {useEffect, useState} from "react";
import axios from 'axios';
import MenuBar from "../components/MenuBar";
import '../Test2.css'

function NewTest() {
    const [jsondata, setJsondata] = useState([{}]);
    const [datalength, setLength] = useState(0);
    const [symptom_level, setSymptom_level] = useState(1);
    const [symptom, setSymptom] = useState('이+아픔');

    useEffect( () => {
        axios( {
            method: 'get',
            url: 'testapi?symptom_level=' + symptom_level + '&symptom=' + symptom,
        })
        .then(response => {
            console.log("데이터 받아왔어요! : " + response.data);
            setJsondata(response.data);
            console.log("데이터 길이: " + response.data.length);

        })
    }, [symptom, symptom_level]);

    const AfterSubmit = (e) => {
        e.preventDefault(); //redirect 방지
        //console.log('출력: ' + e.target[0].value);
        //console.log('출력2: ' + e.target[1].value);

        const symptom_level = e.target[0].value;
        const symptom = e.target[1].value;

        if (symptom_level != 0 && symptom != '증상') {
            setSymptom_level(e.target[0].value)
            setSymptom(e.target[1].value)
        }
        else if (symptom_level != 0 && symptom == '증상') {
            alert("증상을 선택해주세요.");
            //console.log("증상 선택 안됨")
        }
        else if (symptom_level == 0 && symptom != '증상') {
            alert("증상 정도를 선택해주세요.");
            //console.log("증상 정도 선택 안됨")
        }
        else {
            alert("증상 정도와 증상을 선택해주세요.");
            //console.log("둘 다 선택 안됨.")
        }
    }

    const Call = (value, e) => {
        alert("전화번호: " + value);
    }

    

    //const inputAddr = req.query.inputAddr;
    //const inputType = req.query.inputType;
    //const inputFilter = req.query.inputFilter;
    //위와 같이 3개 값 넘겨줘야 함.
    return (
        <div className="BackgroundDiv">
            <MenuBar />
            <p className="SearchMainText">증상을 입력해주세요</p>
            <form onSubmit={AfterSubmit} >
                    <div className="SearchSection">
                        <select name="symptom_level" className="symptom_level">
                            <option value="0">증상 정도</option>
                            <option value="1">매우 아픔</option>
                            <option value="2">조금 아픔</option>
                            <option value="3">보통</option>
                            <option value="4">약한 증상</option>
                            <option value="5">의심 증상</option>
                        </select>
                        <select name="symptom" className="symptom">
                            <option>증상</option>
                            <option>머리 아픔</option>
                            <option>눈 이상</option>
                            <option>뼈 부러짐</option>
                            <option>코 막힘</option>
                            <option>이 아픔</option>
                        </select>
                        <button type="submit" className="formBtn">검색</button>
                    </div>
            </form>
            

            <div className="cardDiv">
                {jsondata.map((data, index) => (
                    <div className="card1">
                        <p key={index} className="Hname">{data.name}</p>
                        <p key={index} className="Haddr">{data.addr}</p>
                        <p key={index} className="Htelno">{data.telno}</p>
                        <button type="button" className="CallBtn" onClick={e => Call(data.telno, e)}>전화 걸기</button>
                    </div>
                ))}
                {
                    datalength === 0
                    ? <p className="noneResultText">검색 결과가 없습니다.</p>
                    : null
                }
            </div>
        </div>
    )
}

export default NewTest;