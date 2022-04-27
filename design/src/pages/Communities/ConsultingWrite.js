import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import MenuBar from '../../components/MenuBar';
import Footer from "../../components/Footer";

const Post = (props) => {
  const navigate = useNavigate();

  const AfterSubmit = (e) => {
    e.preventDefault(); //redirect 방지
    console.log("0번: " + e.target[0].value); //제목
    console.log("1번: " + e.target[1].value); //내용
  
    const inputTitle = e.target[0].value;
    const inputDescription = e.target[1].value;
    
    if (e.target[0].value != '') {
      axios.post("/community/questions-post", {
        inputTitle: inputTitle,
        inputDescription: inputDescription,
      })
      .then(function (response) {
        alert("게시글이 성공적으로 등록되었습니다. \n목록으로 이동합니다.");
        navigate('/community/consulting')
      })
      .catch(function (error) {
        alert("게시글 등록 실패");
      })
    }
    else {
      alert("제목과 내용을 모두 입력해주세요.");
    }
  }

  const BacktoPage = (e) => {
    if (window.confirm("정말 취소하시겠습니까? \n계속을 누르시면 목록으로 돌아갑니다.")) {
      alert("글 작성이 취소되었습니다.");
      navigate('/community/consulting');
    }
    
  }

  return (
    <div>
        <MenuBar></MenuBar>
        <div className="MainTopDiv">
          <span className="MainTopSpan">상담게시판 게시글 작성</span>
        </div>
        <section>
          <main>
          <form className="QuestionWriteForm" onSubmit={AfterSubmit}>
            <input type="text" required name="title" className="inputTitle" id="inputTitle" placeholder="input yout title"></input>
            <input type="textarea" required name="description" className="inputDescription" id="inputDescription" placeholder="input your Description"></input>
            <button id="submitBtn" type="submit">완료</button>
          </form>
          <button id="submitCancel" onClick={BacktoPage}>취소</button>
          </main>
        </section>
        <Footer></Footer>
    </div>
  );
};

export default Post;