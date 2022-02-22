import React from "react";
import { Link } from 'react-router-dom'
import MenuBar from '../components/MenuBar'
import Footer from "../components/Footer";

function Intro({ location, history }) {
    return (
        <>
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">병원 검색 서비스</span>
            <span className="MainTopSpan2">단국대학교 소프트웨어학과 박경미, 황예진</span>
          </div>
        </div>
        

        <div className="IntroMainDiv">
          <span className="IntroMainText">소개 문구가 들어갈 영역입니다.</span>
        </div>



        <div className="IntroBtnDiv" id="1">
          <p className="IntroMoveText">위와 같은 <strong>병원 검색 서비스</strong>를 이용하시려면 아래의 버튼을 <strong>클릭</strong>해주세요!</p>
          <Link to="/newtest">
            <button className="IntroMoveBtn" href="/newtest">이동하기</button>
          </Link>
        </div>
        
        <Footer></Footer>
        </>
    );
}

export default Intro;