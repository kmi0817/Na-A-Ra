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
    axios.get('http://220.149.235.76:3001/mypage/', {
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
                  <table className="mypageReports_table" border="1">
                    <th></th>
                    <th>내용</th>
                    <th>작성일자</th>
                    <th>승인여부</th>
                  {
                    reports_data.map((data,index) => (
                    <tr>
                      <td key={index} className="td0">{index+1}</td>
                      <td key={index} className="td1">{data.hospital_id[0].name}</td>
                      <td key={index} className="td2">{data.created_at}</td>
                      <td key={index} className="td3"><span className={data.if_confirmed ? "comment_btn_yes" : "comment_btn_no"}>{data.if_confirmed ? "승인" : "비승인"}</span></td>
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