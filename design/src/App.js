import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './comments.css';
import './HospitalDetail.css';
import './sign.css';
import './community.css';
import './img.css';
import './animation.css';
import './mypage.css';
import './search.css';
import MainPage from './pages/MainPage';
import Notfound from './pages/Notfound';
import Search from "./pages/Search";
import HospitalDetail from "./pages/HospitalDetail";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Intro from './pages/Intro';
import Mypage from './pages/Mypage';
import Community from './pages/Communities/community';
import Consulting from './pages/Communities/Consulting';
import Question from './pages/Communities/Question';
import QuestionWrite from './pages/Communities/QuestionWrite';
import ConsultingWrite from './pages/Communities/ConsultingWrite';
import QuestionDetail from './pages/Communities/QuestionDetail';
import ConsultingDetail from './pages/Communities/ConsultingDetail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<HospitalDetail />} />
          <Route path="/:id" element={<HospitalDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/mypage" element={<Mypage />} />

          <Route path="/community" element={<Community />} />
          <Route path="/community/consulting" element={<Consulting />} />
          <Route path="/community/consulting-write" element={<ConsultingWrite />} />
          <Route path="/community/consulting/:id" element={<ConsultingDetail />} />
          <Route path="/community/question" element={<Question />} />
          <Route path="/community/question-write" element={<QuestionWrite />} />
          <Route path="/community/question/:id" element={<QuestionDetail />} />
          
          <Route path="*" element={<Notfound/>} />
        </Routes>
      </Router>
      </div>
    )
  }
}

export default App;