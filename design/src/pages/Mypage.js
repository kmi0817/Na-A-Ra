import axios from "axios";
import React, { useState, useEffect } from "react";
import MenuBar from '../components/MenuBar'
import Footer from "../components/Footer";
import Comment_data from "../components/mypageComponents/comments_data";
import Comments_privacy from "../components/mypageComponents/comments_privacy";

const Mypage = () => {
  const [home_data, setHomeData] = useState();
  const [comments_data, setCommentsData] = useState();
  const [commentsLength, setcommentsLength] = useState(0);
  const [reports_data, setReportsData] = useState();
  const [boolReview, setBoolReview] = useState(false);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/mypage/', {
    })
    .then(function (response) {
      console.log("home_results: " + response.data.home_results)
      //_id, created_at, id_admin, user_id, user_salt, user_hashedPassword
      console.log("comments_results: " + response.data.comments_results[1].hospital_id[0].name)
      
      //_id, writer_id, hospital_id(_id, name), description, created_at, is_deleted
      console.log("reports_results: " + response.data.reports_results)

      setHomeData(response.data.home_results)
      setCommentsData(response.data.comments_results)
      setcommentsLength(response.data.comments_results.length)
      setReportsData(response.data.reports_results)

    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }

  const ReviewArea = async (e) => {
    setBoolReview(true)
}


    return (
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">마이페이지</span>
          </div>

          <div className="mypage_Area">
            <button className="mypage_AreaBtn">신고 병원</button>
            <button className={boolReview ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => ReviewArea(e)}>작성 리뷰</button>
            <button className="mypage_AreaBtn">작성 게시글</button>
            <button className="mypage_AreaBtn">작성 댓글</button>
          </div>


          {
            boolReview ?
            <Comment_data></Comment_data>
            : 
            <Comments_privacy></Comments_privacy>
          }



          <Footer></Footer>
        </div>
    );
}

export default Mypage;//