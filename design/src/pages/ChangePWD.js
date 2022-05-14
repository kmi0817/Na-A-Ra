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
    console.log("1번: " + e.target[1].value); //old 비밀번호
    console.log("2번: " + e.target[2].value); //new 비밀번호
    console.log("3번: " + e.target[3].value); //new 비밀번호 확인
  
    const input_id = e.target[0].value;
    const old_password = e.target[1].value;
    const new_password = e.target[2].value;
    const new_password_check = e.target[3].value
    
  if ( window.confirm("새 비밀번호로 변경됩니다. \n변경하시겠습니까?") && e.target[0].value != '' && e.target[1].value != '') {
      axios.post("/process/change-password", {
        input_id: input_id,
        old_password: old_password,
        new_password: new_password,
        new_password_check: new_password_check,
      })
      .then(function (response) {
        if (response.data.text == "성공") {
          alert("비밀번호가 정상적으로 변경되었습니다.")
          setModalOpen(false);
          navigate('/mypage')
        }
        else {
          alert(response.data.text)
        }
      })
      .catch(function (error) {
        alert("비밀번호 변경 실패");
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
            <input type="text" required name="input_id" id="inputId" placeholder="id" minlength="5" maxlength="20"></input>
            <input type="password" required name="old_password" id="inputPassword" minlength="7" placeholder="old password"></input>
            <input type="password" required name="new_password" id="inputPassword" minlength="7" placeholder="new password"></input>
            <input type="password" required name="new_password_check" id="inputPassword" minlength="7" placeholder="check password"></input>
            <button id="submitBtn" type="submit">완료</button>
          </form>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Post;