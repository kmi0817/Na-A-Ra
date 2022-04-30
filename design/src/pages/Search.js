import React, {useEffect, useState} from "react";
import axios from 'axios';
import MenuBar from "../components/MenuBar";
import AddrModal from './AddrModal';
import HospitalsModal from './HospitalsModal';
import Footer from "../components/Footer";

function NewTest() {
    //요청 데이터 관련
    const [jsondata, setJsondata] = useState([{}]);
    const [datalength, setLength] = useState(0);

    //요청 폼 관련
    const [inputAddr, setinputAddr] = useState('');
    const [inputType, setinputType] = useState('');
    const [inputFilter, setinputFilter] = useState('');
    
    //조건부 텍스트 렌더링
    const [listText, setlistText] = useState('아직 검색하지 않았어요!');

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

    const [boolAddr, setBoolAddr] = useState(true);
    const [boolName, setBoolName] = useState(false);

    const AfterSubmit_Addr = async (e) => {
        e.preventDefault(); //redirect 방지

        const addr = address;
        const type = e.target[2].value;
        const filter = e.target[3].value;
        const filter_addr = e.target[4].value;

        if (addr != '' && type != '병원종류') {
            setJsondata([{}])
            setLength(0)
            axios( {
                method: 'get',
                url: '/newapi?inputAddr=' + addr + '&inputType=' + type + '&inputFilter=' + filter + '&addrFilter=' + filter_addr,
            })
            .then(response => {
                console.log("데이터 : " + response.data.results);
                setJsondata(response.data.results);
                console.log("데이터 길이: " + response.data.results.length);
                setLength(response.data.results.length)
                if (response.data.results.length === 0) {
                    setlistText('검색 결과가 없습니다.');
                }
                else {
                    setlistText('');
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        }
        else {
            alert("주소, 병원 종류, 보기 종류를 선택해주세요.");
        }
    }

    const AfterSubmit_Name = async (e) => {
        e.preventDefault(); //redirect 방지
        const hospital_name = e.target[0].value;
        console.log(e.target[0].value);

        if (hospital_name != '') {
            setJsondata([{}])
            setLength(0)
            axios( {
                method: 'get',
                url: '/name-search?hospital_name=' + hospital_name,
            })
            .then(response => {
                console.log("데이터 받아왔어요! : " + response.data.results);
                setJsondata(response.data.results);
                console.log("데이터 길이: " + response.data.results.length);
                setLength(response.data.results.length)
                if (response.data.results.length === 0) {
                    setlistText('검색 결과가 없습니다.');
                }
                else {
                    setlistText('');
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        }
        else {
            alert("병원명을 입력해주세요.");
        }
    }


    const Call = (value, e) => {
        alert("전화번호: " + value);
    }

    const ChangeAdddr = async (e) => {
        setBoolAddr(true)
        setBoolName(false)
    }

    const ChangeName = async (e) => {
        setBoolAddr(false)
        setBoolName(true)
    }


    return (
        <div className="SeacrchBackground">
            <div className="BackgroundDiv">
            <MenuBar />
            <p className="SearchMainText">Search</p>
            <button className={boolAddr ? 'SearchBtnActive' : 'SearchBtnNonActive'} onClick={e => ChangeAdddr(e)}>주소명 검색</button>
            <button className={boolName ? 'SearchBtnActive' : 'SearchBtnNonActive'} onClick={e => ChangeName(e)}>병원명 검색</button>

            {
                boolAddr ?
            <form onSubmit={AfterSubmit_Addr} >
                    <div className="SearchSection">
                        <input value={address} className="inputAddr"></input>
                        <button type="button" className="AddrBtn" onClick={openModal}>주소 검색</button>
                        <AddrModal open={modalOpen} close={closeModal} header="주소 검색" address={address} setAddress={setAddress} setModalOpen={setModalOpen} autoClose></AddrModal>
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
                        <select name="AddrFilter" className="symptom">
                            <option value="lo">-로 단위</option>
                            <option value="gu">-구 단위</option>
                        </select>
                        <button type="submit" className="formBtn">검색</button>
                    </div>
            </form>
            : null
            }

            {
                boolName  ? 
                <form onSubmit={AfterSubmit_Name}>
                    <input className="inputAddr"></input>
                    <button type="submit" className="formBtn">검색</button>
                </form>
                : null
            }


            
            {
            datalength === 0 ? null : <p>검색 결과는 <strong>{datalength}</strong>건입니다.</p>
            }
            <div className="cardDiv">
                {
                datalength === 0 ? null :
                jsondata.map((data) => (
                    <div className="card1">
                        <p key={data._id} className="Hname">{data.name}</p>
                        <p key={data._id} className="Haddr">{data.addr}</p>
                        <p key={data._id} className="Htelno">{data.telno}</p>
                        <button type="button" className="CallBtn" key={data._id} onClick={e => Call(data.telno, e)}>전화 걸기</button>
                        <button type="button" className="DetailBtn" key={data._id} onClick={e => openDModal(data, e)}>상세정보</button>
                    </div>
                ))
                }
                <HospitalsModal open={DmodalOpen} close={closeDModal} data={modalData} autoClose></HospitalsModal>
                {
                    datalength === 0 ?
                    <p className="noneResultText">{listText}</p>
                    : null
                }
            </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default NewTest;