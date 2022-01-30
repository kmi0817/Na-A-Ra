import React, { Component } from 'react';

class Header extends Component {
    render() {
      return (
        <header>
          <h2 className="menuText">나아라</h2>

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