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
    axios.get('http://220.149.235.76:3001/admin/', {
    })
    .then(function (response) {
      setReportsData(response.data.reports)
      setReportsLength(response.data.reports.length)
      console.log(JSON.stringify(response.data.reports))

    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const AcceptReport = (report_id, hospital_id, e) => {
    axios.post('http://220.149.235.76:3001/admin/confirm-report', {
      report_id: report_id,
      hospital_id: hospital_id,
    })
    .then(function (response) {
      alert(response.data.text)
      LoadData();
    })
    .catch(function (error) {
      alert("승인 실패" + error)
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
                        <td key={index} className="adminReport_td2"><button key={index} className="REBTN">거절</button><button className="ACBTN" onClick={e => AcceptReport(data._id, data.hospital_id[0]._id, e)}>승인</button></td>
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