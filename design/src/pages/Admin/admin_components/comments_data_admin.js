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
    axios.get('http://220.149.235.76:3001/admin/users/' + props_id, {
    })
    .then(function (response) {
      setuserReviews(response.data.comments_results)
      setreviewsLength(response.data.comments_results.length)
    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }


    return (
        <>
            {
                reviewsLength == 0 ? 
                <Contents_none text="작성한 댓글이 없습니다."></Contents_none> 
                :
                <div className="review_Div">
                  <table className="admin_table" border="1">
                    <th></th>
                    <th>병원</th>
                    <th>신고일자</th>
                  {
                    user_reviews.map((data,index) => (
                      <tr>
                        <td key={index} className="adminReport_td0">{index+1}</td>
                        <td key={index} className="adminComments_desc">{data.description}</td>
                        <td key={index} className="admin_date">{data.created_at}</td>
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