import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigation } from "react-router";
import MenuBar from '../components/MenuBar'
import Footer from "../components/Footer";

const HospitalDetail = () => {
  const [comments, setcomments] = useState();
  const [commentsLength, setLength] = useState(0);
  const [user_id, setUserId] = useState(null);
  const [admin_id, setAdminId] = useState(null);
  const [text, setText] = useState('');
  
  const location = useLocation();
  console.log(location.state)
  const data = location.state.data;
  const path = "http://220.149.235.76:3001/reviews/" + data._id;

  useEffect(() => {
    CheckUser();
    GetData();
  }, []);

  const GetData = async (e) => {
    axios.get(path, {
    })
    .then(function (response) {
      setUserId(response.data.user_id);
      if (response.data.admin_id) {
        setAdminId(response.data.admin_id);
      }
      else {
        setAdminId(null);
      }
      setcomments(response.data.comments);
      setLength(response.data.comments.length);
      console.log(response.data.comments)
    })
    .catch(function (error) {
    })
  }

  const CheckUser = async (e) => {
    axios.get('http://220.149.235.76:3001/checkUser', {
    })
    .then(function (response) {
      if( response.data.user_id_id !== null) {
        setUserId(response.data.user_id_id);
      }
    })
  }

  const AfterSubmit = (e) => {
    e.preventDefault(); //redirect 방지
    console.log("0번: " + e.target[0].value); //내용
    console.log("2번: " + e.target[2].value); //병원
    axios.get('http://220.149.235.76:3001/checkUser', {
    })
    .then(function (response) {
      if( response.data.user_id_id !== '') {
        setUserId(response.data.user_id_id)
        const description = e.target[0].value;
        const writer_id = response.data.user_id_id;
        console.log("유저아이디: "+response.data.user_id_id)
        const hospital_id = e.target[2].value;
    
        if (e.target[0].value != '') {
          axios.post("http://220.149.235.76:3001/reviews/write", {
            writer_id: writer_id,
            hospital_id: hospital_id,
            description: description,
          })
          .then(function (response) {
            alert("리뷰가 작성되었습니다.");
            console.log(response.data.comments)
            setText('')
            GetData();
          })
          .catch(function (error) {
            alert("실패");
          })
      }
      else {
        alert("내용을 입력해주세요.");
      }
      }
    })
    .catch(function (error) {
    })
    
}

const onChange = (e) => {
  setText(e.target.value)
}

    return (
        <div className="MypageBackground">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
          <svg className="MainHeaderImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#809fff" fill-opacity="1" d="M0,128L80,144C160,160,320,192,480,170.7C640,149,800,75,960,53.3C1120,32,1280,64,1360,80L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>

            <span className="MainTopSpan">{data.name}</span>
          </div>
          
          <form onSubmit={AfterSubmit} className="ReviewForm">
            <textarea name="description" className="ReviewDesc" cols="30" rows="5" onChange={onChange} value={text} placeholder="한 번 작성한 리뷰는 삭제 및 수정이 불가합니다. (5글자 이상부터 등록 가능)"></textarea>
            <input type="hidden" name="writer_id" value={user_id}></input>
            <input type="hidden" name="hospital_id" value={data._id}></input>
            <div className="SubmitBtnDiv">
            <button id="submitBtn" type="submit">완료</button>
            </div>
          </form>
        
          <div className="OutDiv">
          {
              commentsLength === 0 ? 
                <p className="commentsNoneText">등록된 리뷰가 없습니다.</p>
              :
              comments.map((data, id) => (
                  <div className={id % 2 == 0 ? 'commentsDiv'+ 0 : 'commentsDiv'+ 1}>
                      <p key={id} className="writer_id">{data.writer_id[0].user_id}</p>
                      <p key={id} className="description">{data.description}</p>
                      { user_id == data.writer ?
                        <button className="DelBtn">삭제</button>
                      :
                        null
                      }
                  </div>
              ))
          }
          </div>

          <Footer></Footer>
        </div>
    );
}

export default HospitalDetail;