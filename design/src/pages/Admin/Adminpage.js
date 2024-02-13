import axios from "axios";
import React, { useState, useEffect } from "react";
import MenuBar from '../../components/MenuBar'
import Footer from "../../components/Footer";
import Comment_data from "../../components/mypageComponents/comments_data";
import User_data_admin from "./User_data_admin";
import Report_data_admin from "./Reports_data_admin";
import Report_accept_admin from "./Reports_accept_admin";

const Adminpage = () => {
  const [boolUser, setBoolUser] = useState(true);
  const [boolHospital, setBoolHospital] = useState(false);
  const [boolReports, setBoolReports] = useState(false);

  useEffect(() => {
  }, []);

  const UserArea = async (e) => {
    setBoolUser(!(boolUser))
    setBoolHospital(false)
    setBoolReports(false)
  }

  const HospitalArea = async (e) => {
    setBoolUser(false)
    setBoolHospital(!(boolHospital))
    setBoolReports(false)
  }

  const ReportsArea = async (e) => {
    setBoolUser(false)
    setBoolHospital(false)
    setBoolReports(!(boolReports))
  }

    return (
        <div className="MypageBackground">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">관리자 페이지</span>
          </div>

          <div className="mypage_Area">
            <button className={boolUser ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => UserArea(e)}>회원관리</button>
            <button className={boolHospital ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => HospitalArea(e)}>병원신고현황</button>
            <button className={boolReports ? 'mypage_AreaBtnActive' : 'mypage_AreaBtn'} onClick={e => ReportsArea(e)}>신고접수관리</button>
          </div>

          {
            boolUser ?
            <User_data_admin></User_data_admin>
            : 
            null
          }
          {
            boolHospital ?
            <Report_data_admin></Report_data_admin>
            : 
            null
          }
          {
            boolReports ?
            <Report_accept_admin></Report_accept_admin>
            : 
            null
          }

          <Footer></Footer>
        </div>
    );
}

export default Adminpage;