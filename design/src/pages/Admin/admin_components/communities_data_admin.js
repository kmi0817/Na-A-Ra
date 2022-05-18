import axios from "axios";
import React, { useState, useEffect } from "react";
import Contents_none from "../../../components/mypageComponents/contents_none";

const Reviews_data = (props) => {
  const [user_reviews, setuserReviews] = useState();
  const [reviewsLength, setreviewsLength] = useState(0);
  const props_user_id = props.user_id;
  const props_id = props._id;

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/admin/member/' + props_id, {
    })
    .then(function (response) {
      console.log("데이터: " + response.data.communities_results[0])
      setuserReviews(response.data.communities_results)
      setreviewsLength(response.data.communities_results.length)
    })
    .catch(function (error) {
      console.log(error)
    })
  }


    return (
        <>
            {
                reviewsLength == 0 ? 
                <Contents_none text="작성한 게시글이 없습니다."></Contents_none> 
                :
                  <div className="review_Div">
                  <table className="admin_table" border="1">
                    <th></th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성일자</th>
                  {
                    user_reviews.map((data,index) => (
                      <tr>
                        <td key={index} className="adminReport_td0">{index+1}</td>
                        <td key={index} className="adminReport_td1">{data.title}</td>
                        <td key={index} className="adminReport_td2">{data.description}</td>
                        <td key={index} className="adminReport_td3">{data.created_at}</td>
                      </tr>
                    ))
                  }
                </table>
                </div>
            }
        </>
    );
}

export default Reviews_data;