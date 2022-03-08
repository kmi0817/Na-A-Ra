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
      axios.get('/checkUser', {
      })
      .then(function (response) {
        if( response.data.user_id_id !== null) {
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
            <span className="Hmodal_type_code">분류: {data.type_code}</span>
            <span className="Hmodal_addr">위치: {data.addr} ({data.postNo})</span>
            <span className="Hmodal_telno">전화번호: {data.telno}</span>
            <span className="Hmodal_url">홈페이지: {data.hospUrl ? data.hospUrl : <span className="noneAddr">(주소 미입력)</span>}</span>
            <span className="Hmodal_estbDd">개설일자: {data.estbDd}</span>
            <span className="Hmodal_drTotCnt">총 의사수: {data.drTotCnt}</span>


            <table className="Hmodal_table" border="1">
              <th>명칭</th>
              <th>인원</th>
              <th>명칭</th>
              <th>인원</th>
              <th>명칭</th>
              <th>인원</th>
              <th>명칭</th>
              <th>인원</th>
              <tr>
                <td>치과일반의</td>
                <td>{data.detyGdrCnt}</td>
                <td>치과인턴</td>
                <td>{data.detyIntnCnt}</td>
                <td>치과레지던트</td>
                <td>{data.detyResdntCnt}</td>
                <td>치과전문의</td>
                <td>{data.detySdrCnt}</td>
              </tr>
              <tr>
                <td>의과일반의</td>
                <td>{data.mdeptGdrCnt}</td>
                <td>의과인턴</td>
                <td>{data.mdeptIntnCnt}</td>
                <td>의과레지던트</td>
                <td>{data.mdeptResdntCnt}</td>
                <td>의과전문의</td>
                <td>{data.mdeptSdrCnt}</td>
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