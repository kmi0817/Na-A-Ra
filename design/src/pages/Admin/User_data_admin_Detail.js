import axios from "axios";
import React, { useState, useEffect } from "react";
import {useNavigate, useLocation} from "react-router";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import Contents_none from "../../components/mypageComponents/contents_none";
import Reviews_data_admin from "./admin_components/reviews_data_admin";
import Reports_data_admin from "./admin_components/reports_data_admin";
import Communities_data_admin from "./admin_components/communities_data_admin";
import Comments_data_admin from "./admin_components/comments_data_admin";

const Reviews_data = () => {
  const [user_reviews, setuserReviews] = useState();
  const [user_reports, setuserReports] = useState();
  const [user_communities, setuserCommunities] = useState();
  const [user_comments, setuserComments] = useState();
  const [userLength, setuserLength] = useState(0);
  const [user_id, setuserId] = useState();
  const location = useLocation();

  const [boolReviews, setBoolReviews] = useState(false);
  const [boolReports, setBoolReports] = useState(false);
  const [boolCommunities, setBoolCommunities] = useState(false);
  const [boolComments, setBoolComments] = useState(false);

  useEffect(() => {
    LoadData();
    console.log(location.state.user_id)
    setuserId(location.state.user_id);
  }, []);

  const LoadData = async() => {
    axios.get('/admin/member' + location.state.id, {
    })
    .then(function (response) {
      setuserReviews(response.data.reviews_results)
      setuserReports(response.data.reports_results)
      setuserCommunities(response.data.communities_results)
      setuserComments(response.data.comments_results)
    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }

  const ReviewsArea = async (e) => {
    setBoolReviews(!(boolReviews))
    setBoolReports(false)
    setBoolCommunities(false)
    setBoolComments(false)
  }

  const ReportsArea = async (e) => {
    setBoolReviews(false)
    setBoolReports(!(boolReports))
    setBoolCommunities(false)
    setBoolComments(false)
  }

  const CommunitiesArea = async (e) => {
    setBoolReviews(false)
    setBoolReports(false)
    setBoolCommunities(!(boolCommunities))
    setBoolComments(false)
  }

  const CommentsArea = async (e) => {
    setBoolReviews(false)
    setBoolReports(false)
    setBoolCommunities(false)
    setBoolComments(!(boolComments))
  }


    return (
        <>
        <div className="MypageBackground">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">{user_id}</span>
          </div>
                <div className="mypage_Area">
                  <button className={boolReviews ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => ReviewsArea(e)}>리뷰</button>
                  <button className={boolReports ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => ReportsArea(e)}>신고</button>
                  <button className={boolCommunities ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => CommunitiesArea(e)}>게시글</button>
                  <button className={boolComments ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => CommentsArea(e)}>댓글</button>
                </div>

                {
                  boolReviews ?
                  <Reviews_data_admin user_id={user_id}></Reviews_data_admin>
                  : 
                  null
                }
                {
                  boolReports ?
                  <Reports_data_admin user_id={user_id}></Reports_data_admin>
                  : 
                  null
                }
                {
                  boolCommunities ?
                  <Communities_data_admin user_id={user_id}></Communities_data_admin>
                  : 
                  null
                }
                {
                  boolComments ?
                  <Comments_data_admin user_id={user_id}></Comments_data_admin>
                  : 
                  null
                }
          <Footer></Footer>
        </div>
        </>
    );
}

export default Reviews_data;