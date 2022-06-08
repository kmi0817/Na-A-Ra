import axios from "axios";
import React, { useState, useEffect } from "react";
import Contents_none from "../../../components/mypageComponents/contents_none";

const Reviews_data = (props) => {
  const [user_reviews, setuserReviews] = useState();
  const [reviewsLength, setreviewsLength] = useState(0);
  const [user_id, setUserId] = useState();
  const props_user_id = props.user_id;
  const props_id = props._id;

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('http://220.149.235.76:3001/admin/users/' + props_id, {
    })
    .then(function (response) {
      setuserReviews(response.data.reviews_results)
      setreviewsLength(response.data.reviews_results.length)
    })
    .catch(function (error) {
      console.log(error)
    })
  }


    return (
        <>
            {
                reviewsLength == 0 ? 
                <Contents_none text="작성한 리뷰가 없습니다."></Contents_none> 
                :
                <div className="review_Div">
                  <table className="admin_table" border="1">
                    <th></th>
                    <th>병원</th>
                    <th>내용</th>
                    <th>작성일자</th>
                  {
                    user_reviews.map((data,index) => (
                      <tr>
                        <td key={index} className="adminReview_td0">{index+1}</td>
                        <td key={index} className="adminReview_td1">{data.hospital_id[0].name}</td>
                        <td key={index} className="adminReview_td2">{data.description}</td>
                        <td key={index} className="adminReview_td3">{data.created_at}</td>
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