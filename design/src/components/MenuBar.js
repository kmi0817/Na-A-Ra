import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import SigninModal from '../pages/SigninModal';

const Header = () => {
  const [iflogin, setIflogin] = useState(false);

  useEffect(() => {
    axios.get('/checkUser', {
    })
    .then(function (response) {
      if( response.data.user_id !== null) {
        alert("로그인 상태입니다.");
        setIflogin(true);
      }
      else {
        alert("로그아웃 상태입니다.");
        setIflogin(false);
      }
    })
    .catch(function (error) {
    })
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
    const openModal = (e) => {
        //모달 열기
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };


      return (
        <header>
          <Link to="/">
          <h2 className="menuText"><a className="mainPageLink">나아라</a></h2>
          </Link>
          <nav>
            <ul className="menu">
              <Link to="/signin">
              {
              iflogin === false ? 
              <>
              <li id="HeaderSignin" onClick={e => openModal(e)}>로그인</li>
              <SigninModal open={modalOpen} close={closeModal} autoClose></SigninModal>
              </>
              :
              <li id="HeaderSignin">로그아웃</li>
              }
              </Link>
              <li>|</li>
              <Link to="/signup">
              {
              iflogin === false ? 
              <li id="HeaderSignup">회원가입</li>
              :
              <li id="HeaderSignin">MYPAGE</li>
              }
              </Link>
            </ul>
          </nav>
          
        </header>
      )
}

export default Header;