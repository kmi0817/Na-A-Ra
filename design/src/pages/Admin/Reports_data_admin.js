import axios from "axios";
import React, { useState, useEffect } from "react";
import Contents_none from "../../components/mypageComponents/contents_none";

const Reviews_data = () => {
  const [Hospitals_data, setHospitalsData] = useState();
  const [HospitalsLength, setHospitalsLength] = useState(0);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async() => {
    axios.get('/admin/', {
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data.hospitals))
      setHospitalsData(response.data.hospitals)
      setHospitalsLength(response.data.hospitals.length)

    })
    .catch(function (error) {
      console.log("can't load server's data.")
    })
  }


    return (
        <>
            {
                HospitalsLength == 0 ? 
                <Contents_none text="병원 리스트가 없습니다."></Contents_none> 
                :
                <div className="review_Div">
                {
                Hospitals_data.map((data,index) => (
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