import axios from "axios";
import React, { useState, useEffect } from "react";
import Contents_none from "./contents_none";

const Reviews_data = () => {
  const [reviews_data, setReviewsData] = useState();
  const [reviewsLength, setreviewsLength] = useState(0);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/mypage/', {
    })
    .then(function (response) {
      console.log("reviews_results: " + response.data.reviews_results[1].hospital_id[0].name)
      setReviewsData(response.data.reviews_results)
      setreviewsLength(response.data.reviews_results.length)

    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }


    return (
        <>
            {
                reviewsLength == 0 ? 
                <Contents_none text="작성된 리뷰가 없습니다."></Contents_none> 
                :
                <div className="review_Div">
                {
                reviews_data.map((data,index) => (
                    <div className="review_comment_div">
                        <span key={index} className="comment_No">{index+1}</span>
                        <span key={index} className="comment_Desc">{data.description}</span>
                        <span key={index} className="comment_Data">{data.created_at}</span>
                    </div>
                ))
                }
                </div>
            }
        </>
    );
}

export default Reviews_data;