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
    axios.get('/admin/', {
    })
    .then(function (response) {
      //writer_id, hospital_id, _id, created_at
      setReportsData(response.data.reports)
      setReportsLength(response.data.reports.length)
      console.log(JSON.stringify(response.data.reports[0]))

    })
    .catch(function (error) {
      console.log(error)
    })
  }


    return (
        <>
            {
              ReportsLength == 0 ?
              <Contents_none text="병원 리스트가 없습니다."></Contents_none> 
              :
                <div className="review_Div">
                  <table className="admin_table" border="1">
                    <th></th>
                    <th>병원</th>
                    <th>신고일자</th>
                    <th>승인/거절</th>
                  {
                    Reports_data.map((data, index) => (
                      <tr>
                        <td key={index} className="adminReport_td0">{index+1}</td>
                        <td key={index} className="adminReport_td1">{data.hospital_id[0].name}</td>
                        <td key={index} className="adminReport_td3">{data.created_at}</td>
                        <td key={index} className="adminReport_td2"><button key={index} className="REBTN">거절</button><button className="ACBTN">승인</button></td>
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