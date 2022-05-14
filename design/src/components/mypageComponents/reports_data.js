import axios from "axios";
import React, { useState, useEffect } from "react";
import Contents_none from "./contents_none";

const Reviews_data = () => {
  const [reports_data, setreportsData] = useState();
  const [reportsLength, setreportsLength] = useState(0);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/mypage/', {
    })
    .then(function (response) {
      console.log("reports_results: " + response.data.reports_results)
      setreportsData(response.data.reports_results)
      setreportsLength(response.data.reports_results.length)

    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }


    return (
        <>
            {
                reportsLength == 0 ? 
                <Contents_none text="신고한 내역이 없습니다."></Contents_none>
                :
                <div className="review_Div">
                {
                reports_data.map((data,index) => (
                    <div className="review_comment_div">
                        <span key={index} className="comment_No">{index+1}</span>
                        <span key={index} className="comment_Desc">{data.hospital_id[0].name}</span>
                        <span key={index} className="comment_btn">{data.if_confirmed ? "승인" : "비승인"}</span>
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