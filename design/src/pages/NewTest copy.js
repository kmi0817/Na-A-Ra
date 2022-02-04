import React, {useEffect, useState} from "react";
import axios from 'axios';
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

    const [inputAddr, setinputAddr] = useState('서울 송파구 백제고분로 2');
    const [inputType, setinputType] = useState('외과');
    const [inputFilter, setinputFilter] = useState('all');


    
    
    useEffect( () => {
        axios( {
            method: 'get',
            url: 'newapi?inputAddr=' + inputAddr + '&inputType=' + inputType + '&inputFilter=' + inputFilter,
        })
        .then(response => {
            console.log("데이터 받아왔어요! : " + response.data);
            setJsondata(response.data);
            console.log("데이터 길이: " + response.data.length);

        })
    }, [inputAddr, inputType, inputFilter]);

    const AfterSubmit = (e) => {
        e.preventDefault(); //redirect 방지

        const symptom_level = e.target[0].value;
        const symptom = e.target[1].value;

        if (symptom_level != 0 && symptom != '증상') {
            setSymptom_level(e.target[0].value)
            setSymptom(e.target[1].value)
        }
        else if (inputAddr != '' && inputType == '병원종류') {
            alert("주소를 입력해주세요.");
        }
        else if (inputAddr == '' && inputType != '병원종류') {
            alert("병원 종류를 선택해주세요.");
        }
        else {
            alert("주소, 병원 종류, 보기 종류를 선택해주세요.");
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
                        <input value={address}></input>
                        <button onClick={()=> {setPopup(!popup)}}>주소 검색</button>
                        {
                            popup && 
                            <Post address={address} setAddress={setAddress}></Post>
                        }
                        <select name="inputType" className="symptom_level">
                            <option value="병원종류">병원종류</option>
                            <option value="이비인후과">이비인후과</option>
                            <option value="내과">내과</option>
                            <option value="외과">외과</option>
                            <option value="정형외과">정형외과</option>
                            <option value="안과">안과</option>
                            <option value="치과">치과</option>
                            <option value="피부과">피부과</option>
                            <option value="한의원">한의원</option>
                            <option value="가정의학과">가정의학과</option>
                        </select>
                        <select name="inputFilter" className="symptom">
                            <option value="all">전체보기</option>
                            <option value="infant">소아과 보기</option>
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