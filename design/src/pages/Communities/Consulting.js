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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  let no = 1;
  
  useEffect(() => {
    setData()
    setDataLength(0)
    setBool(false)
    GetData();
  }, [page]);

  const GetData = async (e) => {
    axios.get("/community/clinics", {params: {page: page}})
    .then(function (response) {
      setBool(true)
      setData(response.data.postings);
      setTotalPages(response.data.totalPages)
      setDataLength(response.data.postings.length);
    })
    .catch(function (error) {
    })
  }

    const openDetail = (value, e) => {
      console.log("value: " + value)
      navigate('/community/consulting/'+value, { state: {id: value}});
    }

    const writeCheck = (e) => {
      axios.get('/checkUser', {
      })
      .then(function (response) {
        if( response.data.user_id_id !== null) {
          navigate('/community/consulting-write');
        }
        else {
          alert("회원만 작성할 수 있습니다.")
        }
      })
    }

    const downPage = (e) => {
      if (page >=2) {
        setPage(page-1)
        GetData()
      }
      else {
        alert("첫번째 페이지입니다.")
      }
    }
    
    const upPage = (e) => {
      if (page < totalPages) {
        setPage(page+1)
        GetData()
      }
      else {
        alert("마지막 페이지입니다.")
      }
    }
      
  

    return (
        <>
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">상담게시판</span>
            <span className="MainTopSpan2">일반 사용자들이 전문가에게 증상에 대해 상담받을 수 있는 곳</span>
          </div>
        </div>

        <div className="OutDiv">
        {
          getdataLength === 0 ? null :
          getdataBool && getdata.map((data, index) => (
            <div className={index % 2 == 0 ? 'BoardDiv'+ 1 : 'BoardDiv'+ 0}>
              <span key={index} className="QesDetail_No">{((page-1)*5)+(index+1)}</span>
              <span key={index} className="QuesDetail_Title" onClick={e => openDetail(data._id, e)}>{data.title}</span>
              <span key={index} className="QuesDetail_Date">{data.created_at}</span>
            </div>
          ))
        }
        </div>
          <div className="BtnDiv">
            <button className="pageBtn" onClick={e => downPage(e)}>이전</button>
            <button className="pageBtn" onClick={e => upPage(e)}>다음</button>
            <button className="WriteBtn" onClick={e => writeCheck(e)}><img className="WriteBtnImg_color" src="/svg/fi-rr-edit.svg"></img></button>
          </div>
            
        

        <Footer></Footer>
        </>
    );
}

export default Question;