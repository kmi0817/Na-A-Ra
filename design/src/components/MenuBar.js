import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigation, useNavigate } from "react-router";
import axios from "axios";
import { Link } from 'react-router-dom';
import SigninModal from '../pages/SigninModal';
import SignupModal from '../pages/Signup';

const Header = () => {
  const [iflogin, setIflogin] = useState(false);
  const navigate = useNavigate();

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
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

  const moveMypage = () => {
    navigate('/mypage');
  }


      return (
        <header>
          <Link to="/">
          <h2 className="menuText"><a className="mainPageLink">나아라</a></h2>
          </Link>
          <nav>
            <ul className="menu">

              {
              iflogin === false ? 
              <>
              <li id="HeaderSignin" onClick={e => openModal(e)}>로그인</li>
              <SigninModal open={modalOpen} close={closeModal} header="로그인" setModalOpen={setModalOpen} autoClose></SigninModal>
              </>
              :
              <li id="HeaderSignin">로그아웃</li>
              }
              <li>|</li>
              {
              iflogin === false ? 
              <>
              <li id="HeaderSignup" onClick={e => openModal(e)}>회원가입</li>
              <SigninModal open={modalOpen} close={closeModal} header="회원가입" setModalOpen={setModalOpen} autoClose></SigninModal>
              </>
              :
              <li id="HeaderSignup" onClick={moveMypage}>MYPAGE</li>
              }
            </ul>
          </nav>
          
        </header>
      )
}

export default Header;