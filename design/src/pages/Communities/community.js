import React from "react";
import { Link } from 'react-router-dom'
import MenuBar from '../../components/MenuBar'
import Footer from "../../components/Footer";

function Community({ location, history }) {
    return (
        <>
        <div className="App">
        <img className="boardBack" src="boardBack.jpg"></img>
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">이곳은 <strong>나아라</strong>의 커뮤니티입니다!</span>
            <span className="MainTopSpanSub">원하는 유형의 커뮤니티를 선택해주세요.</span>
          </div>



          <div className="CommuBtnDiv" id="1">
          <Link to="/community/consulting">
            <button className="QMoveBtn" href="/community/consulting">상담게시판</button>
          </Link>
          <Link to="/community/question">
            <button className="CMoveBtn" href="/community/question">질문게시판</button>
          </Link>
        </div>
        
        <Footer></Footer>
        </div>
        </>
    );
}

export default Community;