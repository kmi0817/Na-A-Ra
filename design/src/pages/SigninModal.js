import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import './modal.css';

const Post = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;
  const { open, close, header } = props;
  const setModalOpen = props.setModalOpen;
  const setIflogin = props.setIflogin;
  const navigate = useNavigate();

  const onCompletePost = (data) => {
    console.log(data.address);
    setAddress(data.address);
    setModalOpen(false);
  };

  const AfterSubmit = (e) => {
    e.preventDefault(); //redirect 방지
    console.log("0번: " + e.target[0].value); //아이디
    console.log("1번: " + e.target[1].value); //비밀번호
  
    const inputId = e.target[0].value;
    const inputPassword = e.target[1].value;
    
    if (e.target[0].value != '') {
      axios.post("/login", {
        inputId: inputId,
        inputPassword: inputPassword,
      })
      .then(function (response) {
        alert(response.data.text);
        setIflogin(true)
        setModalOpen(false);
      })
      .catch(function (error) {
        alert("요청 실패");
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
          <form className="signForm" onSubmit={AfterSubmit}>
            <input type="text" required name="inputId" class="form-control" id="inputId" placeholder="ID" minlength="5" maxlength="20"></input>
            <input type="password" required name="inputPassword" class="form-control" id="inputPassword" placeholder="Password" minlength="7"></input>
            <button id="submitBtn" type="submit">완료</button>
          </form>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Post;