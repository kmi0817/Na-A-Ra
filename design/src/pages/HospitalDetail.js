import React from "react";
import { Link } from 'react-router-dom'
import MenuBar from '../components/MenuBar'

const HospitalDetail = (props) => {
    
    return (
        <div className="App">
          <MenuBar></MenuBar>
          <div className="MainTopDiv">
            <span className="MainTopSpan">병원 소개</span>
          </div>
          <Link to={`/detail/hihello`}>
            <button>테스트</button>
          </Link>
        </div>
    );
}

export default HospitalDetail;