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
            <span className="MainTopSpan">어떤 증상을 겪고 계신가요?</span>
            <Link to="/intro">
            <button className="MainTopBtn">서비스 소개</button>
            </Link>
          </div>
        

        <div className="MainSelection">
          <Link to="/community">
          <button className="community_btn"><img className="MainBtnImg_color" src="/svg/fi-rr-users-alt.svg"></img>커뮤니티</button>
          </Link>
          <Link to="/search">
          <button className="search_btn"><img className="MainBtnImg_white" src="/svg/fi-rr-search.svg"></img>검색</button>
          </Link>
          <Link to="/intro">
          <button className="intro_btn"><img className="MainBtnImg_color" src="/svg/fi-rr-info.svg"></img>서비스 소개</button>
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