import React from "react";
import { Link } from 'react-router-dom'
import MenuBar from '../components/MenuBar'
import Footer from "../components/Footer";

function MainPage({ location, history }) {
    return (
        <>
          <MenuBar></MenuBar>
          <div className="MainBackground">
          <div className="MainTopDiv">
            <svg className="MainHeaderImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#809fff" fill-opacity="1" d="M0,128L80,144C160,160,320,192,480,170.7C640,149,800,75,960,53.3C1120,32,1280,64,1360,80L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            <span className="MainTopSpan-1">NaARa</span>
            <span className="MainTopSpan-2">裸芽羅</span>
          </div>
        

        <div className="MainSelection">
          <Link to="/community">
          <button className="community_btn"><img className="MainBtnImg_color" src="/svg/fi-rr-users-alt.svg"></img><span>커뮤니티</span></button>
          </Link>
          <Link to="/search">
          <button className="search_btn"><img className="MainBtnImg_white" src="/svg/fi-rr-search.svg"></img><span>검색</span></button>
          </Link>
          <Link to="/intro">
          <button className="intro_btn"><img className="MainBtnImg_color" src="/svg/fi-rr-info.svg"></img><span>서비스 소개</span></button>
          </Link>
        </div>

        <div className="MainMidDiv">
          <span className="MidText">전문가분들의 도움이 필요해요!</span>
          <span>본 서비스는 더 정확한 정보 전달을 위해 의료 전문가분들의 자문이 필요합니다.</span>
          <span>추천도 시스템을 개선하기 위해 증상과 관련하여 의견 주실 분들을 기다립니다.</span>
          <img className="MainImg" src="/svg/fi-rr-angle-circle-down.svg" />
          <span className="MidTextEnd">※ 전문가가 아니더라도 서비스 향상과 관련한 피드백도 환영합니다!</span>
          <button>도움주기</button>
        </div>
        
        <Footer></Footer>
        </div>
        </>
    );
}

export default MainPage;