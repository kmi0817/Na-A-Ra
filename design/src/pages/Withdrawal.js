import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import './modal.css';

const Post = (props) => {
  const { open, close, header } = props;
  const setModalOpen = props.setModalOpen;
  const navigate = useNavigate();

  const AfterSubmit = (e) => {
    e.preventDefault(); //redirect 방지
    console.log("0번: " + e.target[0].value); //아이디
    console.log("1번: " + e.target[1].value); //비밀번호
  
    const withdrawal_id = e.target[0].value;
    const withdrawal_password = e.target[1].value;
    
  if ( window.confirm("탈퇴하시면 동일한 아이디로 재가입이 불가능합니다. \n탈퇴하시겠습니까?") && e.target[0].value != '' && e.target[1].value != '') {
      axios.delete("http://220.149.235.76:3001/mypage/withdrawal", {
        withdrawal_id: withdrawal_id,
        withdrawal_password: withdrawal_password,
      })
      .then(function (response) {
        alert(response.data.text);
        setModalOpen(false);
        navigate('/')
      })
      .catch(function (error) {
        alert("실패");
        console.log(error)
      })
  }
  else {
      alert("입력해주세요.");
  }
}

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>&times;</button>
          </header>
          <main>
          <form className="commentsForm" onSubmit={AfterSubmit}>
            <input type="text" required name="inputId" id="inputId" placeholder="ID" minlength="5" maxlength="20"></input>
            <input type="password" required name="inputPassword" id="inputPassword" placeholder="Password" minlength="7"></input>
            <button id="submitBtn" type="submit">완료</button>
          </form>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Post;