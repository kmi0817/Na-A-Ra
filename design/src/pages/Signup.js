import axios from "axios";
//import React, { useState } from "react";
import MenuBar from '../components/MenuBar'

const Signup= () => {
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
        alert(response.data.text);
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
        </div>
    );
}

export default Signup;