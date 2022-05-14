import axios from "axios";
import React, { useState, useEffect } from "react";
import ChangePWD from "../../pages/ChangePWD";

const Comments_privacy = () => {
  const [home_data, sethomeData] = useState();
  const [homeLength, sethomeLength] = useState(0);

  //modal
  const [modalOpen, setModalOpen] = useState(false);
    const openModal = (e) => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/mypage/', {
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
              <div>
              <span className="privacy_contents_text">ID</span>
              <span>{homeLength != 0 ? home_data.user_id : null}</span>
              </div>
              <div>
              <span className="privacy_contents_text">가입일시</span>
              <span>{homeLength != 0 ? home_data.created_at : null}</span>
              </div>
              <button className="privacy_changePWD"  onClick={e => openModal(e)}>비밀번호 변경</button>
              <ChangePWD open={modalOpen} close={closeModal} header="비밀번호 변경" setModalOpen={setModalOpen} autoClose></ChangePWD>
            </div>
          </div>
        </>
    );
}

export default Comments_privacy;