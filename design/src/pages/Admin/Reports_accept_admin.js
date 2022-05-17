import axios from "axios";
import React, { useState, useEffect } from "react";
import Contents_none from "../../components/mypageComponents/contents_none";

const Reviews_data = () => {
  const [Reports_data, setReportsData] = useState();
  const [ReportsLength, setReportsLength] = useState(0);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/mypage/', {
    })
    .then(function (response) {
      console.log("Reports_results: " + response.data.Reports_results)
      setReportsData(response.data.Reports_results)
      setReportsLength(response.data.reports_results.length)

    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }


    return (
        <>
                <div className="review_Div">
                    <div className="review_comment_div">
                        <span className="comment_No">1</span>
                        <span className="comment_Desc">라미체성형외과의원</span>
                        <button className="REBTN">거절</button><button className="ACBTN">승인</button>
                        <span className="admin_report_data">hyj3463</span>
                    </div>
                    <div className="review_comment_div">
                        <span className="comment_No">2</span>
                        <span className="comment_Desc">송파길신경외과의원</span>
                        <button className="REBTN">거절</button><button className="ACBTN">승인</button>
                        <span className="admin_report_data">hyj3463@naver.com</span>
                    </div>
                    <div className="review_comment_div">
                        <span className="comment_No">3</span>
                        <span className="comment_Desc">잠실대항장문서울외과의원</span>
                        <button className="REBTN">거절</button><button className="ACBTN">승인</button>
                        <span className="admin_report_data">hyj3463@naver.com</span>
                    </div>
                    <div className="review_comment_div">
                        <span className="comment_No">4</span>
                        <span className="comment_Desc">참외과 참소아청소년과의원</span>
                        <button className="REBTN">거절</button><button className="ACBTN">승인</button>
                        <span className="admin_report_data">nmg3463</span>
                    </div>
                </div>
        </>
    );
}

export default Reviews_data;