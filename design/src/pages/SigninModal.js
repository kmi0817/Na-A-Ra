import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import './modal.css';

const Post = (props) => {
  const { open, close, data } = props;
  const navigate = useNavigate;
  
  const onClickMove = () => {
    navigate(`/detail/${data._id}`, { data: data});
  }

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
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {data.name}
            <button className="close" onClick={close}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
          <form onSubmit={AfterSubmit} className="commentsForm">
            <input type="text" required name="inputId" class="form-control" id="inputId" placeholder="ID" minlength="5" maxlength="20"></input>
            <input type="password" required name="inputPassword" class="form-control" id="inputPassword" placeholder="Password" minlength="7"></input>
            <button id="submitBtn" type="submit">완료</button>
          </form>
          </main>
          <footer>
            <button className="close" onClick={close}>
              {' '}
              close{' '}
            </button>
            <Link to={"/${data._id}"} state={{ data: data }}>
            <button className="DetailMoveBtn">상세페이지</button>
            </Link>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Post;