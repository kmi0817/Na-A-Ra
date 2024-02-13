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
    axios.get('http://220.149.235.76:3001/mypage/', {
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
                  <table className="mypageReports_table" border="1">
                    <th></th>
                    <th>내용</th>
                    <th>작성일자</th>
                  {
                    reviews_data.map((data,index) => (
                      <tr>
                        <td key={index} className="review_td0">{index+1}</td>
                        <td key={index} className="review_td1">{data.description}</td>
                        <td key={index} className="review_td2">{data.created_at}</td>
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