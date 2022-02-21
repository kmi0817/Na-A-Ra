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
              <Link to="/signin">
              <li id="HeaderSignin">로그인</li>
              </Link>
              <li>|</li>
              <Link to="/signup">
              <li id="HeaderSignup">회원가입</li>
              </Link>
            </ul>
          </nav>
        </header>
      )
    }
}

export default Header;