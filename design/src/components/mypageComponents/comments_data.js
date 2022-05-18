import axios from "axios";
import React, { useState, useEffect } from "react";
import Contents_none from "./contents_none";

const Reviews_data = () => {
  const [comments_data, setCommentsData] = useState();
  const [commentsLength, setcommentsLength] = useState(0);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/mypage/', {
    })
    .then(function (response) {
      console.log("comments_results: " + response.data.comments_results)
      setCommentsData(response.data.comments_results)
      setcommentsLength(response.data.comments_results.length)

    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }


    return (
        <>
            {
                commentsLength == 0 ? 
                <Contents_none text="작성된 댓글이 없습니다."></Contents_none> 
                :
                <div className="review_Div">
                  <table className="mypageReports_table" border="1">
                    <th></th>
                    <th>내용</th>
                    <th>작성일자</th>
                  {
                    comments_data.map((data,index) => (
                      <tr>
                        <td key={index} className="comments_td0">{index+1}</td>
                        <td key={index} className="comments_td1">{data.description}</td>
                        <td key={index} className="comments_td2">{data.created_at}</td>
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