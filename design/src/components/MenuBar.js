import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigation, useNavigate } from "react-router";
import axios from "axios";
import { Link } from 'react-router-dom';
import SigninModal from '../pages/SigninModal';
import SignupModal from '../pages/SignupModal';

const Header = () => {
  const navigate = useNavigate();
  const [iflogin, setIflogin] = useState();
  const [modalOpen, setModalOpen] = useState(false);
    const openModal = (e) => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

  const moveMypage = () => {
    navigate('/mypage');
  }//

  const [modalOpen2, setModalOpen2] = useState(false);
    const openModal2 = (e) => {
        setModalOpen2(true);
    };
    const closeModal2 = () => {
        setModalOpen2(false);
    };

    useEffect(() => {
      checkUser();
    }, []);

    const checkUser = () => {
      axios.get('/checkUser', {
      })
      .then(function (response) {
        if( response.data.user_id_id != "none") {
          //console.log("user_id_id: " + response.data.user_id_id)
          //console.log("user_name: " + response.data.user_id)
          setIflogin(true)
        }
        else {
          console.log("로그인 상태가 아닙니다.")
          setIflogin(false)
        }
      })
      .catch(function (error) {
      })
    }

    const logout = (e) => {
      axios.post("/process/logout", {
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
              iflogin === false ? 
              <>
              <li id="HeaderSignin" onClick={e => openModal(e)}>로그인</li>
              <SigninModal open={modalOpen} close={closeModal} header="로그인" setModalOpen={setModalOpen} setIflogin={setIflogin} autoClose></SigninModal>
              </>
              :
              <li id="HeaderSignin" onClick={e => logout(e)}>로그아웃</li>
              }
              <li>|</li>
              {
              iflogin === false ? 
              <>
              <li id="HeaderSignup" onClick={e => openModal2(e)}>회원가입</li>
              <SignupModal open={modalOpen2} close={closeModal2} header="회원가입" setModalOpen={setModalOpen2} autoClose></SignupModal>
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