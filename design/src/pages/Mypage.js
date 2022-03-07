import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigation } from "react-router";
import MenuBar from '../components/MenuBar'
import Footer from "../components/Footer";

const Mypage = () => {
    return (
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">마이페이지</span>
          </div>

          <Footer></Footer>
        </div>
    );
}

export default Mypage;