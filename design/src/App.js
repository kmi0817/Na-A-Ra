import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './comments.css';
import MainPage from './pages/MainPage';
import Notfound from './pages/Notfound';
import NewTest from "./pages/NewTest";
import HospitalDetail from "./pages/HospitalDetail";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Intro from './pages/Intro';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/newtest" element={<NewTest />} />
          <Route path="/detail" element={<HospitalDetail />} />
          <Route path="/:id" element={<HospitalDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/intro" element={<Intro />} />

          <Route path="*" element={<Notfound/>} />
        </Routes>
      </Router>
      </div>
    )
  }
}

export default App;