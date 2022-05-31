import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from 'react-router-dom';
import SigninModal from '../pages/SigninModal';
import SignupModal from '../pages/SignupModal';

const Header = () => {
  const navigate = useNavigate();
  const [iflogin, setIflogin] = useState(false);
  const [ifAdminlogin, setIfAdminlogin] = useState(false);
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

  const moveAdminpage = () => {
    navigate('/admin');
  }

  const [modalOpen2, setModalOpen2] = useState(false);
    const openModal2 = (e) => {
        setModalOpen2(true);
    };
    const closeModal2 = () => {
        setModalOpen2(false);
    };

    useEffect(() => {
      setIflogin(false)
      setIfAdminlogin(false)
      checkUser();
    }, []);

    const checkUser = async () => {
      axios.get('/checkUser', {
      })
      .then(function (response) {
        if( response.data.user_id_id != "" && response.data.admin_id_id == "") { //일반 사용자면
          setIflogin(true)
          setIfAdminlogin(false)
        }
        else if (response.data.admin_id_id != "" && response.data.user_id_id == "") { //관리자 권한이면
          setIfAdminlogin(true)
          setIflogin(false)
        }
        else {
          console.log("로그인 상태가 아닙니다.")
          setIflogin(false)
          setIfAdminlogin(false)
        }
      })
      .catch(function (error) {
      })
    }

    const logout = (e) => {
      axios.post("/logout", {
      })
      .then(function (response) {
        alert(response.data.text + "되었습니다.");
        setIflogin(false)
      })
      .catch(function (error) {
        alert("실패");
      })
    };

      return (
        <header>
          <Link to="/">
          <h2 className="menuText"><a className="mainPageLink">나아라</a></h2>
          </Link>
          <nav>
            <ul className="menu">

            {
              iflogin === true ? 
              <li id="HeaderSignin" onClick={e => logout(e)}>로그아웃</li>
              :
              (
                ifAdminlogin === true ?
                  <li id="HeaderSignin" onClick={e => logout(e)}>로그아웃</li>
                  : 
                  <>
                  <li id="HeaderSignin" onClick={e => openModal(e)}>로그인</li>
                  <SigninModal open={modalOpen} close={closeModal} header="로그인" setModalOpen={setModalOpen} setIflogin={setIflogin} autoClose></SigninModal>
              </>
              )
              
              }
              <li>|</li>
              {
                iflogin === true ? 
                  <li id="HeaderSignup" onClick={moveMypage}>MYPAGE</li>
                : 
                ( 
                  ifAdminlogin === true ? 
                  <li id="HeaderSignup" onClick={moveAdminpage}>ADMIN</li>
                  : 
                  <>
                  <li id="HeaderSignup" onClick={e => openModal2(e)}>회원가입</li>
                  <SignupModal open={modalOpen2} close={closeModal2} header="회원가입" setModalOpen={setModalOpen2} autoClose></SignupModal>
                  </>
                )
              }
            </ul>
          </nav>
          
        </header>
      )
}

export default Header;