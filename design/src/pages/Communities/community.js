import React from "react";
import { Link } from 'react-router-dom'
import MenuBar from '../../components/MenuBar'
import Footer from "../../components/Footer";

function Community({ location, history }) {
    return (
        <>
        <div className="CommuBackground">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
          <svg className="MainHeaderImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#809fff" fill-opacity="1" d="M0,128L80,144C160,160,320,192,480,170.7C640,149,800,75,960,53.3C1120,32,1280,64,1360,80L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            <span className="MainTopSpan">이곳은 <strong>나아라</strong>의 커뮤니티입니다!</span>
            <span className="MainTopSpanSub">원하는 유형의 커뮤니티를 선택해주세요.</span>
          </div>
          
          <div className="CommuBtnDiv" id="1">
          <Link to="/community/consulting">
            <button className="QMoveBtn" href="/community/consulting"><img className="MainBtnImg_color" src="/svg/fi-rr-graduation-cap.svg"></img>상담게시판</button>
          </Link>
          <Link to="/community/question">
            <button className="CMoveBtn" href="/community/question"><img className="MainBtnImg_color" src="/svg/fi-rr-info.svg"></img>질문게시판</button>
          </Link>
        </div>
        
        <Footer></Footer>
        </div>
        </>
    );
}

export default Community;