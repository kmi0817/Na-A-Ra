import axios from "axios";
import React, { useState, useEffect } from "react";
import Contents_none from "../../../components/mypageComponents/contents_none";

const Reviews_data = (props) => {
  const [user_reviews, setuserReviews] = useState();
  const [reviewsLength, setreviewsLength] = useState(0);
  const props_user_id = props.user_id;
  const props_id = props._id;//

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/admin/member/' + props_id, {
    })
    .then(function (response) {
      console.log("신고 데이터: " + JSON.stringify(response.data.reports_results[0]))
      setuserReviews(response.data.reports_results)
      setreviewsLength(response.data.reports_results.length)
    })
    .catch(function (error) {
      console.log(error)
    })
  }


    return (
        <>
            {
                reviewsLength == 0 ? 
                <Contents_none text="보낸 신고가 없습니다."></Contents_none> 
                :
                <div className="review_Div">
                  <table className="admin_table" border="1">
                    <th></th>
                    <th>병원</th>
                    <th>신고일자</th>
                    <th>승인/비승인</th>
                  {
                  user_reviews.map((data,index) => (
                    <tr>
                      <td key={index} className="adminReport_td0">{index+1}</td>
                      <td key={index} className="adminReport_td1">{data.hospital_id[0].name}</td>
                      <td key={index} className="admin_date">{data.created_at}</td>
                      <td key={index} className="adminBtn_td3">{data.is_confirmed ? <button className="ACBTN_check">승인</button> : <button key={index} className="REBTN_check">비승인</button>}</td>
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