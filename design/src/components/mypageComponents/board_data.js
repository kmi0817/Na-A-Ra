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
                  <table className="mypageReports_table" border="1">
                    <th></th>
                    <th>게시판</th>
                    <th>제목</th>
                    <th>작성일자</th>
                  {
                    boards_data.map((data, index) => (
                      <tr>
                        <td key={index} className="board_td0">{index+1}</td>
                        <td key={index} className="board_td1">{data.community == "clinics" ? "상담" : "질문"}</td>
                        <td key={index} className="board_td2">{data.title}</td>
                        <td key={index} className="board_td3">{data.created_at}</td>
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