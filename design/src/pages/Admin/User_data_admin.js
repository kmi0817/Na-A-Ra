import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {useNavigate, useLocation} from "react-router";
import Contents_none from "../../components/mypageComponents/contents_none";

const Reviews_data = () => {
  const [user_data, setuserData] = useState();
  const [userLength, setuserLength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/admin/', {
    })
    .then(function (response) {
      console.log("user_results: " + response.data.users[0]._id)
      setuserData(response.data.users)
      setuserLength(response.data.users.length)

    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }

  const openDetail = (value1, value2, e) => {
    navigate('/admin/'+value2, { state: {user_id: value1, _id: value2}});
  }



    return (
        <>
            {
                userLength == 0 ? 
                <Contents_none text="가입된 회원이 없습니다."></Contents_none> 
                :
                <div className="review_Div">
                  <table className="admin_table" border="1">
                    <th></th>
                    <th>사용자</th>
                    <th>가입일자</th>
                    <th>권한</th>

                  {
                    user_data.map((data,index) => (
                      <tr>
                      <td key={index} className="admin_td0">{index+1}</td>
                      <td key={index} className="admin_td1" onClick={e => openDetail(data.user_id, data._id, e)}>{data.user_id}</td>
                      <td key={index} className="admin_td2">{data.created_at}</td>
                      <td key={index} className="admin_td3"><span className={data.is_admin ? "admin" : "signuser"}>{data.is_admin ? "관리자" : "회원"}</span></td>
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