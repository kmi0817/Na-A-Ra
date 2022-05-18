import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import DaumPostcode from "react-daum-postcode";
import './modal.css';

const Post = (props) => {
  const { open, close, header } = props;
  const setModalOpen = props.setModalOpen;
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
          setModalOpen(false);
        }
        else if (response.data.text == "success") {
          alert("회원가입에 성공했습니다. \n로그인 화면으로 이동합니다.");
          setModalOpen(false);
        }
        else {
          alert("회원가입에 문제가 발생했습니다. 관리자에게 문의하세요.");
          setModalOpen(false);
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
//
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>&times;</button>
          </header>
          <main>
          <form className="signForm" onSubmit={AfterSubmit}>
            <input type="text" required name="createId" id="inputId" placeholder="ID" minlength="5" maxlength="20"></input>
            <input type="password" required name="createPassword" id="inputPassword" placeholder="Password" minlength="7"></input>
            <button id="submitBtn" type="submit">완료</button>
          </form>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Post;