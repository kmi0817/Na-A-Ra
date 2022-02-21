import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import MenuBar from '../components/MenuBar'

function MainPage({ location, history }) {

    const TestBtn = (e) => {
      axios.get("/testSign", {
      })
      .then(function (response) {
        alert(response.data.text);
      })
      .catch(function (error) {
        alert("실패");
      })
    }

    return (
        <>
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">어떤 증상을 겪고 계신가요?</span>
            <button className="MainTopBtn">서비스 소개</button>
            <span className="MainTopSpan2">증상에 따른 병원을 추천받고 싶다면 아래 버튼을 클릭해 이동해주세요.</span>
          </div>
        </div>
        <div className="MainTopSearchDiv">
          <Link to="/newtest">
            <button className="MoveBtn" href="/newtest">이동하기</button>
          </Link>
        </div>

        <button onClick={TestBtn}>클릭</button>
        
        
        </>
    );
}

export default MainPage;