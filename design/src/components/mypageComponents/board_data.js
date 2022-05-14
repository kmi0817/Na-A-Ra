import axios from "axios";
import React, { useState, useEffect } from "react";
import Contents_none from "./contents_none";

const Reviews_data = () => {
  const [boards_data, setboardsData] = useState();
  const [boardsLength, setboardsLength] = useState(0);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/mypage/', {
    })
    .then(function (response) {
      console.log("boards_results: " + response.data.communities_results)
      setboardsData(response.data.communities_results)
      setboardsLength(response.data.communities_results.length)

    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }


    return (
        <>
            {
                boardsLength == 0 ? 
                <Contents_none text="작성된 게시글이 없습니다."></Contents_none> 
                :
                <div className="review_Div">
                {
                boards_data.map((data,index) => (
                    <div className="review_comment_div">
                        <span key={index} className="comment_No">{index+1}</span>
                        <span key={index} className="comment_Desc">{data.community == "clinics" ? "상담" : "질문"}</span>
                        <span key={index} className="comment_Desc">{data.title}</span>
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