import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
      return (
        <header>
          <Link to="/">
          <h2 className="menuText"><a className="mainPageLink">나아라</a></h2>
          </Link>
          <nav>
            <ul className="menu">
              <li id="HeaderSignin">로그인</li>
              <li>|</li>
              <li id="HeaderSignup">회원가입</li>
            </ul>
          </nav>
        </header>
      )
    }
}

export default Header;