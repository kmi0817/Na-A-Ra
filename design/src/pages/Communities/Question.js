import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'
import MenuBar from '../../components/MenuBar'
import Footer from "../../components/Footer";

const Question = () => {
  const [getdata, setData] = useState();
  const [getdataLength, setDataLength] = useState();
  const [getdataBool, setBool] = useState(false);
  const [user_id, setUserId] = useState();
  const [admin_id, setAdminId] = useState(null);
  const [postings, setPostings] = useState();

  const navigate = useNavigate();
  let no = 1;
  
  useEffect(() => {
    setData()
    setDataLength(0)
    setBool(false)
    GetData();
  }, []);

  const GetData = (e) => {
    axios.get("/community/clinics", {
    })
    .then(function (response) {
      console.log(response.data.postings)
      console.log(response.data.postings.length)
      setBool(true)
      setData(response.data.postings);
      setDataLength(response.data.postings.length);
    })
    .catch(function (error) {

    })
  }

    const openDetail = (value, e) => {
      console.log("value: " + value)
      navigate('/community/question/'+value, { state: {id: value}});
    }
  

    return (
        <>
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">질문게시판</span>
            <span className="MainTopSpan2">모든 사용자들이 증상에 대해 자유롭게 토론하고 의견을 나눌 수 있는 곳</span>
          </div>
        </div>

        <div className="OutDiv">
        {
          getdataLength === 0 ? null :
          getdataBool && getdata.map((data, index) => (
            <div className={index % 2 == 0 ? 'BoardDiv'+ 1 : 'BoardDiv'+ 0}>
              <span key={index} className="QesDetail_No">{index+1}</span>
              <span key={index} className="QuesDetail_Title" onClick={e => openDetail(data._id, e)}>{data.title}</span>
              <span key={index} className="QuesDetail_Date">{data.created_at}</span>
            </div>
          ))
        }
          <Link to="/community/question-write">
            <button className="WriteBtn"><img className="WriteBtnImg_color" src="/svg/fi-rr-edit.svg"></img>작성</button>
          </Link>
        </div>

        <Footer></Footer>
        </>
    );
}

export default Question;