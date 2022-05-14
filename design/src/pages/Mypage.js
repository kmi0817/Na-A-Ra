import axios from "axios";
import React, { useState, useEffect } from "react";
import MenuBar from '../components/MenuBar'
import Footer from "../components/Footer";
import Reports_data from "../components/mypageComponents/reports_data";
import Reviews_data from "../components/mypageComponents/reviews_data";
import Boards_data from "../components/mypageComponents/board_data";
import Comments_data from "../components/mypageComponents/comments_data";
import Comments_privacy from "../components/mypageComponents/comments_privacy";
import Withdrawal from "./Withdrawal";

const Mypage = () => {
  const [boolReports, setBoolReports] = useState(false);
  const [boolReviews, setBoolReviews] = useState(false);
  const [boolBoards, setBoolBoards] = useState(false);
  const [boolComments, setBoolComments] = useState(false);

  //modal
  const [modalOpen, setModalOpen] = useState(false);
    const openModal = (e) => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };//

  useEffect(() => {
  }, []);

  const ReportsArea = async (e) => {
    setBoolReports(!(boolReports))
    setBoolReviews(false)
    setBoolBoards(false)
    setBoolComments(false)
  }
  const ReviewArea = async (e) => {
    setBoolReports(false)
    setBoolReviews(!(boolReviews))
    setBoolBoards(false)
    setBoolComments(false)
  }
  const BoardsArea = async (e) => {
    setBoolReports(false)
    setBoolReviews(false)
    setBoolBoards(!(boolBoards))
    setBoolComments(false)
  }
  const CommentsArea = async (e) => {
    setBoolReports(false)
    setBoolReviews(false)
    setBoolBoards(false)
    setBoolComments(!(boolComments))
  }
 

    return (
        <div className="MypageBackground">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">마이페이지</span>
          </div>

          <div className="mypage_Area">
            <button className={boolReports ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => ReportsArea(e)}>신고 병원</button>
            <button className={boolReviews ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => ReviewArea(e)}>작성 리뷰</button>
            <button className={boolBoards ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => BoardsArea(e)}>작성 게시글</button>
            <button className={boolComments ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => CommentsArea(e)}>작성 댓글</button>
          </div>

          {
            boolReports ?
            <Reports_data></Reports_data>
            : 
            null
          }
          {
            boolReviews ?
            <Reviews_data></Reviews_data>
            : 
            null
          }
          {
            boolBoards ?
            <Boards_data></Boards_data>
            : 
            null
          }
          {
            boolComments ?
            <Comments_data></Comments_data>
            : 
            null
          }
          {
            boolReviews || boolReports || boolComments || boolBoards ?
              null
            : 
            <Comments_privacy></Comments_privacy>
          }

          <div>
            <button className="withdrawalBtn" onClick={e => openModal(e)}>회원 탈퇴</button>
            <Withdrawal open={modalOpen} close={closeModal} header="회원탈퇴" setModalOpen={setModalOpen} autoClose></Withdrawal>
          </div>

          <Footer></Footer>
        </div>
    );
}

export default Mypage;//