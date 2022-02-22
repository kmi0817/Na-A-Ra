import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
      return (
        <div className="footer">
          <nav>
            <ul>
            <span className="footerText">"본 저작물은 '건강보험심사평가원'에서 '16년'작성하여 공공누리 제1유형으로 개방한 '병원정보서비스(작성자:유보라)'을 이용하였으며,
해당 저작물은 '공공데이터포털,https://www.data.go.kr/index.do'에서 무료로 다운받으실 수 있습니다."
            </span>
            </ul>
          </nav>
        </div>
      )
    }
}

export default Footer;