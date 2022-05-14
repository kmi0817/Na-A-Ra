import axios from "axios";
import React, { useState, useEffect } from "react";
import Contents_none from "../../../components/mypageComponents/contents_none";

const Reviews_data = (props) => {
  const [user_reviews, setuserReviews] = useState();
  const [reviewsLength, setreviewsLength] = useState(0);
  const user_id = props.user_id;

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/admin/member' + user_id, {
    })
    .then(function (response) {
      setuserReviews(response.data.reports_results)
      setreviewsLength(response.data.reports_results.length)
    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }


    return (
        <>
            {
                reviewsLength == 0 ? 
                <Contents_none text="보낸 신고가 없습니다."></Contents_none> 
                :
                <div className="review_Div">
                {
                user_reviews.map((data,index) => (
                    <div className="review_comment_div">
                        <span key={index} className="comment_No">{index+1}</span>
                        <span key={index} className="comment_Desc">{data.hospital_id[0].name}</span>
                        <span key={index} className="comment_Data">{data.created_at}</span>
                        <span key={index} className="comment_Data">{data.description}</span>
                    </div>
                ))
                }
                </div>
            }
        </>
    );
}

export default Reviews_data;