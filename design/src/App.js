import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import Notfound from './pages/Notfound';
import Test2 from "./pages/Test2";
import NewTest from "./pages/NewTest";
import HospitalDetail from "./pages/HospitalDetail";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/newtest" element={<NewTest />} />
          <Route path="/detail" element={<HospitalDetail />} />
          <Route path="/detail/:id" element={<HospitalDetail />} />
          <Route path="*" element={<Notfound/>} />
        </Routes>
      </Router>
      </div>
    )
  }
}

export default App;