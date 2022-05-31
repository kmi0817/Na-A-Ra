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
  const [text, setText] = useState('');

  const [user_id, setUserId] = useState();
  const [admin_id, setAdminId] = useState(null);
  const [comments, setcomments] = useState();
  const [commentsLength, setLength] = useState(0);
  const path = "/community/questions/comment";
  const data_path = "/community/questions/" + data_id;

  useEffect(async () => {
    setDataId(location.state.id);
    setBool(false)
    GetData();
  }, []);

  const GetData = async (e) => {
    console.log(data_id)
    axios.get(data_path, {
    })
    .then(function (response) {
      setcomments(response.data.comments)
      setLength(response.data.comments.length)
      setData(response.data.posting)
      setBool(true)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  const AfterSubmit = (e) => {
    e.preventDefault(); //redirect 방지
    const description = e.target[0].value;
    const posting_id = location.state.id;

    if (e.target[0].value != '') {
      axios.get('/checkUser', {
      })
      .then(function (response) {
        if( response.data.user_id_id != "") {
          axios.post(path, {
            writer: response.data.user_id_id,
            posting_id: posting_id,
            description: description,
          })
          .then(function (response) {
            alert(response.data.text);
            setText('')
            GetData();
          })
          .catch(function (error) {
            alert("댓글 작성 실패");
          })
        }
        else {
          alert("회원만 작성 가능합니다.")
        }
      })
      .catch(function (error) {
      })
    }
    else {
      alert("내용을 입력해주세요.");
    }
}

  const BacktoPage = () => {
    navigate('/community/question');
  }

  const onChange = (e) => {
    setText(e.target.value)
  }

  const DeleteComments = (value, e) => {
    if ( window.confirm("댓글을 삭제하시겠습니까?")) {
      axios.delete("/community/" + value, {
      })
      .then(function (response) {
        if (response.data.text == "성공") {
          alert("댓글이 삭제되었습니다.")
          GetData();
        }
        else {
          alert(response.data.text)
        }
      })
      .catch(function (error) {
        alert("댓글 삭제 실패");
        console.log(error)
      })
  }
  else {
      alert("취소했습니다.");
  }
  }

    return (
        <div className="MypageBackground">
          <MenuBar></MenuBar>
          <div className="cardDiv">
            {
                <div className="DetailDiv">
                    <p className="DetailTitle">{data.title}</p>
                    <p className="DetailDate">{data.created_at}</p>
                    <p className="DetailDesc">{data.description}</p>
                </div>
            }
            <button className="BackBtn" onClick={BacktoPage}>이전</button>
          </div>
          

          <div className="cardDiv">
          <form onSubmit={AfterSubmit} className="commentsForm">
            <textarea name="description" id="description" cols="30" rows="5" placeholder="댓글 작성" onChange={onChange} value={text}></textarea>
            <div className="SubmitBtnDiv">
            <button id="submitBtn" type="submit">완료</button>
            </div>
          </form>

          <div className="OutDiv">
          {
              commentsLength === 0 ? 
                <p className="commentsNoneText">등록된 댓글이 없습니다.</p>
              :
              comments.map((data, id) => (
                  <div className={id % 2 == 0 ? 'commentsDiv'+ 0 : 'commentsDiv'+ 1}>
                      <p key={id} className="description">{data.description}</p>
                      <p key={id} className="description">{data.created_at}</p>
                      { user_id !== data.writer ?
                        <button className="DelBtn" onClick={e => DeleteComments(data._id, e)}>삭제</button>
                      :
                        null
                      }
                  </div>
              ))
          }
          </div>
          </div>

          <Footer></Footer>
        </div>
    );
}

export default Question;