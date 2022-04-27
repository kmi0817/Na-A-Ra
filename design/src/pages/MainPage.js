import React from "react";
import { Link } from 'react-router-dom'
import MenuBar from '../components/MenuBar'
import Footer from "../components/Footer";

function MainPage({ location, history }) {
    return (
        <>
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">어떤 증상을 겪고 계신가요?</span>
            <Link to="/intro">
            <button className="MainTopBtn">서비스 소개</button>
            </Link>
          </div>
        </div>

        <div className="MainSelection">
          <Link to="/community">
          <button className="community_btn">커뮤니티</button>
          </Link>
          <Link to="/search">
          <button className="search_btn">주소명 검색</button>
          </Link>
          <Link to="/search-name">
          <button className="intro_btn">병원명 검색</button>
          </Link>
        </div>

        <div className="MainMidDiv">
          <span className="MidText">전문가분들의 도움이 필요해요!</span>
          <span>본 서비스는 더 정확한 정보 전달을 위해 의료 전문가분들의 자문이 필요합니다.</span>
          <span>추천도 시스템을 개선하기 위해 증상과 관련하여 의견 주실 분들을 기다립니다.</span>
          <img className="MainImg" src="mainDirection.png" />
          <span className="MidTextEnd">※ 전문가가 아니더라도 서비스 향상과 관련한 피드백도 환영합니다!</span>
          <button>도움주기</button>
        </div>

        <Footer></Footer>
        </>
    );
}

export default MainPage;