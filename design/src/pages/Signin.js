import axios from "axios";
import React, { useState } from "react";
import { useParams, useLocation, useNavigation, useNavigate } from "react-router";
import MenuBar from '../components/MenuBar';
import Footer from "../components/Footer";

import AddrModal from "../pages/AddrModal";
import SigninModal from "../pages/SigninModal";


const HospitalDetail = () => {
  const [address, setAddress] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
      setModalOpen(true);
  };
  const closeModal = () => {
      setModalOpen(false);
  };
  const navigate = useNavigate();
  

  const AfterSubmit = (e) => {
    e.preventDefault(); //redirect 방지
    console.log("0번: " + e.target[0].value); //아이디
    console.log("1번: " + e.target[1].value); //비밀번호
  
    const inputId = e.target[0].value;
    const inputPassword = e.target[1].value;
    
    if (e.target[0].value != '') {
      axios.post("/process/login", {
        inputId: inputId,
        inputPassword: inputPassword,
      })
      .then(function (response) {
        alert(response.data.text);
        navigate('/');
      })
      .catch(function (error) {
        alert("실패");
      })
    }
    else {
      alert("입력해주세요.");
    }
}

    return (
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">로그인</span>
          </div>
          
          <form onSubmit={AfterSubmit} className="signForm">
            <input type="text" required name="inputId" id="inputId" placeholder="ID" minlength="5" maxlength="20"></input>
            <input type="password" required name="inputPassword" id="inputPassword" placeholder="Password" minlength="7"></input>
            <button id="submitBtn" type="submit">완료</button>
          </form>

          <button type="button" className="AddrBtn" onClick={openModal}>비밀번호를 잊으셨나요?</button>
          <SigninModal open={modalOpen} close={closeModal} header="로그인" address={address} setAddress={setAddress} setModalOpen={setModalOpen} autoClose></SigninModal>


          <Footer></Footer>
        </div>
    );
}

export default HospitalDetail;