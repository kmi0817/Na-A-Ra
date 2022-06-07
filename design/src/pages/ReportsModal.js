import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import './modal.css';

const Post = (props) => {
  const { open, close, header, data, data2 } = props;
  const setModalOpen = props.setModalOpen;
  const navigate = useNavigate();


const ReportsSubmit = (e) => {
  axios.get('/checkUser', {
  })
  .then(function (response) {
    if( response.data.user_id_id !== "") {
      const input_user_id = data2;
      const input_hospital_id = data;
      console.log("아이디: " + input_user_id)
      console.log("병원: " + input_hospital_id)

      axios.post("/report", {
        writer_id: input_user_id,
        hospital_id: input_hospital_id,
      })
      .then(function (res) {
        alert(res.data.text);
        setModalOpen(false);
      })
      .catch(function (error) {
        alert("처리에 문제가 발생했습니다. 관리자에게 문의해주세요.");
      })
    }
    else {
      alert("로그인 후 다시 진행해주세요.");
    }
  })
  .catch(function (error) {
  })
}

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>&times;</button>
          </header>
          <main>
            <p>현재 해당 병원에 문제가 발생하여 <strong>신고</strong>합니다.</p>
            <p>무분별한 신고는 제재 사유가 될 수 있으며, 신고 횟수 적용은 관리자의 승인 후 결정됩니다.</p>
            <p>아래 <strong>[동의 및 신고]</strong>를 클릭하시면 위 내용을 인지하고 <strong>동의</strong>하신 것으로 간주됩니다.</p>
            <button className="close" onClick={close}>취소</button>
            <button className="ReportsBtn" onClick={ReportsSubmit}>동의 및 신고</button>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default Post;