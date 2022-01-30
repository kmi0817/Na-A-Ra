import React from "react";
import MenuBar from '../components/MenuBar'

function MainPage({ location, history }) {
    return (
        <>
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">어떤 증상을 겪고 계신가요?</span>
            <button className="MainTopBtn">서비스 소개</button>
            <span className="MainTopSpan2">아래에서 겪고 계신 증상을 선택해주세요</span>
          </div>
        </div>
        <div className="MainTopSearchDiv">
          <select name="percent" className="MainTopSelect">
            <option value="1">아주 나쁨</option>
            <option value="2">나쁨</option>
            <option value="3">보통</option>
            <option value="4">약함</option>
            <option value="5">아주 약함</option>
          </select>
          <div className="MainTopSubDiv"><input></input><button>검색</button></div>
        </div>

        <div className="MainMidDiv">
          <span className="MidText">전문가분들의 도움이 필요해요!</span>
          <span>본 서비스는 더 정확한 정보 전달을 위해 의료 전문가분들의 자문이 필요합니다.</span>
          <span>추천도 시스템을 개선하기 위해 증상과 관련하여 의견 주실 분들을 기다립니다.</span>
          <span className="MidTextEnd">※ 전문가가 아니더라도 서비스 향상과 관련한 피드백도 환영합니다!</span>
          <button>도움주기</button>
        </div>
        
        </>
    );
}

export default MainPage;