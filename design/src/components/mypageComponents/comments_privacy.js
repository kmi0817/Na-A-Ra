import axios from "axios";
import React, { useState, useEffect } from "react";
import ChangePWD from "../../pages/ChangePWD";
import Withdrawal from "../../pages/Withdrawal";

const Comments_privacy = () => {
  const [home_data, sethomeData] = useState();
  const [homeLength, sethomeLength] = useState(0);

  //change PWD modal
  const [modalOpen, setModalOpen] = useState(false);
    const openModal = (e) => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

  //withdrawal modal
  const [modalOpen2, setModalOpen2] = useState(false);
    const openModal2 = (e) => {
        setModalOpen2(true);
    };
    const closeModal2 = () => {
        setModalOpen2(false);
    };

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('http://220.149.235.76:3001/mypage/', {
    })
    .then(function (response) {
      sethomeData(response.data.home_results)
      sethomeLength(response.data.home_results.length)

    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }

    return (
        <>
          <div className="privacy_Div">
            <img className="privacy_img" src="/svg/fi-rr-user.svg"></img>
            <p className="privacy_text">회원정보</p>
            <div className="privacy_contents">

              
              <table className="mypage_table" border="1">
                <tr>
                  <td className="td0">ID</td>
                  <td>{homeLength != 0 ? home_data.user_id : null}</td>
                </tr>
                <tr>
                  <td className="td0">가입일자</td>
                  <td>{homeLength != 0 ? home_data.created_at : null}</td>
                </tr>
              </table>

              <div className="privacy_btnDiv">
                <button className="privacy_changePWD"  onClick={e => openModal(e)}>비밀번호 변경</button>
                <ChangePWD open={modalOpen} close={closeModal} header="비밀번호 변경" setModalOpen={setModalOpen} autoClose></ChangePWD>
                <button className="withdrawalBtn" onClick={e => openModal2(e)}>회원 탈퇴</button>
                <Withdrawal open={modalOpen2} close={closeModal2} header="회원탈퇴" setModalOpen={setModalOpen2} autoClose></Withdrawal>
              </div>
            </div>
          </div>
        </>
    );
}

export default Comments_privacy;