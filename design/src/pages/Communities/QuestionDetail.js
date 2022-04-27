import axios from "axios";
import React, { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuBar from '../../components/MenuBar'
import Footer from "../../components/Footer";

const Question = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //console.log("state: ", location.state.id);
  const [data_id, setDataId] = useState(location.state.id);
  const [data, setData] = useState({title: "제목1", description: "내용입니다.", created_at: "2022-04-27T07:51:51.702Z"});
  const [dataBool, setBool] = useState(false);

  const [user_id, setUserId] = useState();
  const [admin_id, setAdminId] = useState(null);
  const [postings, setPostings] = useState();


  
  useEffect(async () => {
    setDataId(location.state.id);
    setBool(false)
    GetData();
  }, []);

  const GetData = () => {
    console.log(data_id)
    axios.get("/community/clinics/" + data_id, {
    })
    .then(function (response) {
      console.log("불러온 데이터: " + response.data.posting)
      setData(response.data.posting)
      setBool(true)
    })
    .catch(function (error) {

    })
  }

  const BacktoPage = () => {
    navigate('/community/question');
  }

    return (
        <>
          <MenuBar></MenuBar>
          <div className="cardDiv">
            {
                <div className="DetailDiv">
                    <p className="DetailTitle">{data.title}</p>
                    <p className="DetailDate">{data.created_at}</p>
                    <p className="DetailDesc">{data.description}</p>
                </div>
            }
          </div>
          <button className="BackBtn" onClick={BacktoPage}>이전으로</button>


          <Footer></Footer>
        </>
    );
}

export default Question;