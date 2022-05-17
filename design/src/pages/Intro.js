import React from "react";
import { Link } from 'react-router-dom'
import MenuBar from '../components/MenuBar'
import Footer from "../components/Footer";

function Intro() {
    return (
        <>
        <div className="MainBackground">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <svg className="MainHeaderImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#809fff" fill-opacity="1" d="M0,128L80,144C160,160,320,192,480,170.7C640,149,800,75,960,53.3C1120,32,1280,64,1360,80L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            <span className="MainTopSpan">병원 검색 서비스</span>
            <span className="MainTopSpan2">단국대학교 소프트웨어학과 박경미, 황예진</span>
          </div>
        

        <div className="IntroMainDiv">
          <p className="IntroMainText">저희 <strong>나아라</strong>는 많은 지역을 오가는 현대인들을 위해, 주소만 입력하면 인근의 병원을 출력해주는 서비스입니다.</p>
          <p className="IntroMainTextEng">Our <strong>Naara</strong> is a service that prints out nearby hospitals just by entering an address for modern people who travel to and from many areas.</p>
          <p className="IntroMainText">더불어 일반 검색으로는 쉽게 알아보기 힘들었던 병원의 상세정보를 제공하고 있으며, 다양한 사용자들과 토론할 수 있는 커뮤니티 또한 활발히 운영중입니다.</p>
          <p className="IntroMainTextEng">In addition, it provides detailed information about hospitals that are difficult to find with a general search, and a community where you can discuss with various users is also active.</p>
        </div>


        <div className="IntroBtnDiv" id="1">
          <p className="IntroMoveText">위와 같은 <strong>병원 검색 서비스</strong>를 이용하시려면 아래의 버튼을 <strong>클릭</strong>해주세요!</p>
          <Link to="/search">
            <button className="IntroMoveBtn">이동하기</button>
          </Link>
        </div>
        
        <Footer></Footer>
        </div>
        </>
    );
}

export default Intro;