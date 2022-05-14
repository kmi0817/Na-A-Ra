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
      console.log("user_results: " + response.data.users)
      setuserData(response.data.users)
      setuserLength(response.data.users.length)

    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }

  const openDetail = (value, e) => {
    navigate('/admin/'+value, { state: {user_id: value}});
  }



    return (
        <>
            {
                userLength == 0 ? 
                <Contents_none text="가입된 회원이 없습니다."></Contents_none> 
                :
                <div className="review_Div">
                {
                user_data.map((data,index) => (
                    <div className="review_comment_div">
                        <span key={index} className="comment_No">{index+1}</span>
                        <span key={index} className="comment_Desc" onClick={e => openDetail(data._id, e)}>{data.user_id}</span>
                        <span key={index} className="comment_Data">{data.created_at}</span>
                        <span key={index} className="comment_Data">{data.is_admin ? "관리자" : "회원"}</span>
                    </div>
                ))
                }
                </div>
            }
        </>
    );
}

export default Reviews_data;