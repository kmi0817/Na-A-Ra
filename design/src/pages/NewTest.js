import React, {useEffect, useState} from "react";
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import MenuBar from "../components/MenuBar";
import '../Test2.css'
import Post from './AddrPopup';

function NewTest() {
    const [jsondata, setJsondata] = useState([{}]);
    const [datalength, setLength] = useState(0);
    const [symptom_level, setSymptom_level] = useState(1);
    const [symptom, setSymptom] = useState('이+아픔');

    const [address, setAddress] = useState();
    const [popup, setPopup] = useState(false);

    const [inputAddr, setinputAddr] = useState('경기 남양주시 불암로 336');
    const [inputType, setinputType] = useState('내과');
    const [inputFilter, setinputFilter] = useState('all');


    
    
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

        const symptom_level = e.target[0].value;
        const symptom = e.target[1].value;

        if (symptom_level != 0 && symptom != '증상') {
            setSymptom_level(e.target[0].value)
            setSymptom(e.target[1].value)
        }
        else if (symptom_level != 0 && symptom == '증상') {
            alert("증상을 선택해주세요.");
        }
        else if (symptom_level == 0 && symptom != '증상') {
            alert("증상 정도를 선택해주세요.");
        }
        else {
            alert("증상 정도와 증상을 선택해주세요.");
        }
    }

    const Call = (value, e) => {
        alert("전화번호: " + value);
    }

    //주소가 state에 잘 들어갔는지 확인
    const CheckAddr = (e) => {
        console.log(address);
    }

    const TestApi = (e) => {
        axios( {
            method: 'get',
            url: 'newapi?inputAddr=' + inputAddr + '&inputType=' + inputType + '&inputFilter=' + inputFilter,
        })
        .then(response => {
            console.log("!!!!새로운 데이터!!!!! : " + response.data);
        })
    }
    




    //const inputAddr = req.query.inputAddr;
    //const inputType = req.query.inputType;
    //const inputFilter = req.query.inputFilter;
    //위와 같이 3개 값 넘겨줘야 함.
    return (
        <div className="BackgroundDiv">
            <MenuBar />
            

            <input value={address}></input>
            <button onClick={()=> {setPopup(!popup)}}>주소 검색</button>
            {
                popup && 
                <Post address={address} setAddress={setAddress}></Post>
            }


            <button onClick={CheckAddr}>잘 들어갔는지 확인</button>

            <button onClick={TestApi}>새로운 API확인</button>
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