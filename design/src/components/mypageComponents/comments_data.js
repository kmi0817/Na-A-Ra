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
                {
                comments_data.map((data,index) => (
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