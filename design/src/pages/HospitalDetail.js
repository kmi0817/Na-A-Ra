import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigation } from "react-router";
import MenuBar from '../components/MenuBar'

const HospitalDetail = () => {
  const [comments, setcomments] = useState();
  const [commentsLength, setLength] = useState(0);
  const [user_id, setUserId] = useState();
  
  const location = useLocation();
  console.log(location.state)
  const data = location.state.data;
  const path = "/comments/" + data._id;

  useEffect(() => {
    axios.get(path, {
    })
    .then(function (response) {
      alert(response.data.text + "   " + response.data.user_id);
      setUserId(response.data.user_id);
      setcomments(response.data.comments);
      setLength(response.data.comments.length);
      console.log(response.data.comments)
    })
    .catch(function (error) {
      alert("회원 아이디 가져오기 요청 실패");
    })
  }, []);




  const AfterSubmit = (e) => {
    e.preventDefault(); //redirect 방지
    console.log("0번: " + e.target[0].value); //내용
    console.log("1번: " + e.target[1].value); //작성자
    console.log("2번: " + e.target[2].value); //병원

    const description = e.target[0].value;
    const writer_id = e.target[1].value;
    const hospital_id = e.target[2].value;
    
    if (e.target[0].value != '') {
      axios.post("/comments/write", {
        writer_id: writer_id,
        hospital_id: hospital_id,
        description: description,
      })
      .then(function (response) {
        alert(response.data.text);
        console.log(response.data.comments)
      })
      .catch(function (error) {
        alert("실패");
      })
  }
  else {
      alert("입력해주세요.");
  }
}

    return (
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">{data.name}</span>
          </div>
          
          <form onSubmit={AfterSubmit} className="commentsForm">
            <textarea name="description" id="description" cols="30" rows="5" placeholder="한 번 작성한 리뷰는 삭제 및 수정이 불가합니다. (5글자 이상부터 등록 가능)"></textarea>
            <input type="hidden" name="writer_id" value={user_id}></input>
            <input type="hidden" name="hospital_id" value={data._id}></input>
            <button id="submitBtn" type="submit">완료</button>
          </form>
        
          
          {
              commentsLength === 0 ? null :
              comments.map((data, id) => (
                  <div>
                      <p key={id} className="Hname">{data.writer_id[0].user_id}</p>
                      <p key={id} className="Haddr">{data.description}</p>
                  </div>
              ))
          }


        </div>
    );
}

export default HospitalDetail;