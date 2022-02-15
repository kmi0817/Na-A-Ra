import React, {useEffect, useState} from "react";
import axios from 'axios';
import MenuBar from "../components/MenuBar";
import '../Test2.css'
import AddrModal from './AddrModal';
import HospitalsModal from './HospitalsModal';

function NewTest() {
    //요청 데이터 관련
    const [jsondata, setJsondata] = useState([{}]);
    const [datalength, setLength] = useState(0);

    //요청 폼 관련
    const [inputAddr, setinputAddr] = useState('');
    const [inputType, setinputType] = useState('');
    const [inputFilter, setinputFilter] = useState('');
    
    //조건부 텍스트 렌더링
    const [listText, setlistText] = useState('');

    //주소 모달 관련
    const [address, setAddress] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    
    //상세정보 모달 관련
    const [DmodalOpen, setDModalOpen] = useState(false);
    const [modalData, setmodalData] = useState();
    const openDModal = (value, e) => {
        //모달 열기
        setDModalOpen(true);
        //value는 JSON 데이터이므로 value.name 식으로 접근
        setmodalData(value);
    };
    const closeDModal = () => {
        setDModalOpen(false);
    };

    

    useEffect( () => {
        axios( {
            method: 'get',
            url: 'newapi?inputAddr=' + inputAddr + '&inputType=' + inputType + '&inputFilter=' + inputFilter,
        })
        .then(response => {
            console.log("데이터 받아왔어요! : " + response.data);
            setJsondata(response.data);
            console.log("데이터 길이: " + response.data.length);
            setLength(response.data.length)
        })
    }, [inputAddr, inputType, inputFilter]);

    const AfterSubmit = (e) => {
        e.preventDefault(); //redirect 방지
        console.log(e.target[0].value);
        console.log(e.target[1].value); //이건 뭐지?
        console.log(e.target[2].value);
        console.log(e.target[3].value);


        const addr = e.target[0].value;
        const type = e.target[2].value;
        const filter = e.target[3].value;

        if (addr != '' && type != '증상') {
            setinputAddr(addr)
            setinputType(type)
            setinputFilter(filter);
            setlistText('검색 결과가 없습니다.')
        }
        else if (addr != '' && type == '병원종류') {
            alert("주소를 입력해주세요.");
        }
        else if (addr == '' && type != '병원종류') {
            alert("병원 종류를 선택해주세요.");
        }
        else {
            alert("주소, 병원 종류, 보기 종류를 선택해주세요.");
        }
    }

    const Call = (value, e) => {
        alert("전화번호: " + value);
    }





    return (
        <div className="BackgroundDiv">
            <MenuBar />
            <p className="SearchMainText">증상을 입력해주세요</p>
            <form onSubmit={AfterSubmit} >
                    <div className="SearchSection">
                        <input value={address} className="inputAddr"></input>
                        <button type="button" className="AddrBtn" onClick={openModal}>주소 검색</button>
                        <AddrModal open={modalOpen} close={closeModal} header="주소 검색" address={address} setAddress={setAddress} autoClose></AddrModal>
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
            
            {
            datalength === 0 ? null : <p>검색 결과는 <strong>{datalength}</strong>건입니다.</p>
            }
            <div className="cardDiv">
                {
                datalength === 0 ? null :
                jsondata.map((data, index) => (
                    <div className="card1">
                        <p key={index} className="Hname">{data.name}</p>
                        <p key={index} className="Haddr">{data.addr}</p>
                        <p key={index} className="Htelno">{data.telno}</p>
                        <button type="button" className="CallBtn" onClick={e => Call(data.telno, e)}>전화 걸기</button>
                        <button type="button" className="DetailBtn" onClick={e => openDModal(data, e)}>상세정보</button>
                    </div>
                ))
                }
                <HospitalsModal open={DmodalOpen} close={closeDModal} data={modalData} autoClose></HospitalsModal>
                <p className="noneResultText">{listText}</p>
            </div>
        </div>
    )
}

export default NewTest;