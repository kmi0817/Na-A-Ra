import axios from "axios";
//import React, { useState } from "react";
import { useNavigate } from "react-router";
import MenuBar from '../components/MenuBar'
import Footer from "../components/Footer";

const Signup= () => {
  const navigate = useNavigate();

  const AfterSubmit = (e) => {
    e.preventDefault(); //redirect 방지
    const createId = e.target[0].value;
    const createPassword = e.target[1].value;
    console.log(createId)
    console.log(createPassword)
    
    if (e.target[0].value !== '') {
      axios.post("/process/signup", {
        createId: createId,
        createPassword: createPassword,
      })
      .then(function (response) {
        if (response.data.text == "exist") {
          alert("이미 존재하는 아이디입니다.");
        }
        else if (response.data.text == "success") {
          alert("회원가입에 성공했습니다. \n로그인 화면으로 이동합니다.");
          navigate('/signin');
        }
        else {
          alert("회원가입에 문제가 발생했습니다. 관리자에게 문의하세요.");
        }
      })
      .catch(function (error) {
        alert("요청 실패");
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
            <span className="MainTopSpan">회원가입</span>
          </div>
          
          <form onSubmit={AfterSubmit} className="commentsForm">
            <input type="text" required name="createId" id="createId" placeholder="ID" minLength="5" maxLength="20"></input>
            <input type="password" required name="createPassword" id="createPassword" placeholder="Password" minLength="7"></input>
            <button id="submitBtn" type="submit">완료</button>
          </form>
          <Footer></Footer>
        </div>
    );
}

export default Signup;