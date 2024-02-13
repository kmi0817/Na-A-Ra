import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import './modal.css';
import ReportsModal from './ReportsModal';

const Post = (props) => {
  const { open, close, data } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setmodalData] = useState();
  const [modalData2, setmodalData2] = useState();

  if (data != null) {
    var date = data.estbDd;
    date = "20220325";
    var opendate_year = date.substr(0,4);
    var opendate_month = date.substr(4,2);
    var opendate_day = date.substr(6,2);
  }

    const openModal = (value, e) => {
      axios.get('http://220.149.235.76:3001/checkUser', {
      })
      .then(function (response) {
        if( response.data.user_id_id !== undefined || response.data.user_id_id !== null) {
          console.log("user_id_id: " + response.data.user_id_id)
          setModalOpen(true);
          setmodalData(value);
          setmodalData2(response.data.user_id_id);
        }
        else {
          alert("로그인 후 다시 진행해주세요.");
        }
      })
      .catch(function (error) {
      })
    };
    const closeModal = () => {
        setModalOpen(false);
    };
  
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            <span>{data.name}
            {
              data.reports_cnt == 0 ? 
              <span className="repostsCnt_green">누적신고: {data.reports_cnt}</span>
              : 
              <span className="repostsCnt_red">누적신고: {data.reports_cnt}</span>
            }
            </span>
            <button className="close" onClick={close}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
            <div className="Hmodal_Div">
              <span className="Hmodal_type_code">분류: {data.type_code}</span>
              <span className="Hmodal_addr">위치: {data.addr} ({data.postNo})</span>
              <span className="Hmodal_telno">전화번호: {data.telno}</span>
              <span className="Hmodal_url">홈페이지: {data.hospUrl != null ? data.hospUrl : <span className="noneAddr">none</span>}</span>
              <span className="Hmodal_estbDd">개설일자: {data.estbDd}</span>
              <span className="Hmodal_drTotCnt">총 의사수: {data.drTotCnt}</span>
            </div>

            <table className="Hmodal_table" border="1">
              <th></th>
              <th>일반의</th>
              <th>인턴</th>
              <th>레지던트</th>
              <th>전문의</th>
              <tr>
                <td className="td0">치과</td>
                <td>{data.detyGdrCnt}</td>
                <td>{data.detyIntnCnt}</td>
                <td>{data.detyResdntCnt}</td>
                <td>{data.detySdrCnt}</td>
              </tr>
              <tr>
                <td className="td0">의과</td>
                <td>{data.mdeptGdrCnt}</td>
                <td>{data.mdeptIntnCnt}</td>
                <td>{data.mdeptResdntCnt}</td>
                <td>{data.mdeptSdrCnt}</td>
              </tr>
              <tr>
                <td className="td0">한방</td>
                <td>{data.cmdcIntnCnt}</td>
                <td>{data.cmdcIntnCnt}</td>
                <td>{data.cmdcResdntCnt}</td>
                <td>{data.cmdcSdrCnt}</td>
              </tr>
            </table>
          </main>
          <footer>
            <button className="close" onClick={close}>
              {' '}
              close{' '}
            </button>
            <Link to={"/{data._id}"} state={{ data: data }}>
            <button className="DetailMoveBtn">상세페이지</button>
            </Link>
            <button className="ReportsBtn" onClick={e => openModal(data._id, e)}>신고</button>
            <ReportsModal open={modalOpen} close={closeModal} header="신고" setModalOpen={setModalOpen} data={modalData} data2={modalData2} autoClose></ReportsModal>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Post;