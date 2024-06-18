// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from './Components/Home';
import InternshipPage from './Components/InternshipPage';
import HackRank from './Components/HackRank';
import FreshersJob from './Components/FreshersJob';
import JobDetailPage from './Components/JobDetailPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  
  return (
    
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} setIsAuth={setIsAuth}/>} />
          <Route path="/FreshersJob" element={<FreshersJob isAuth={isAuth} setIsAuth={setIsAuth} />} />
          <Route path="/HackRank" element={<HackRank isAuth={isAuth} setIsAuth={setIsAuth} />} />
          <Route path="/Internship" element={<InternshipPage isAuth={isAuth} setIsAuth={setIsAuth}></InternshipPage>}></Route>
          <Route path="/JobDetailPage/:JobType/:jobId" element={<JobDetailPage isAuth={isAuth} setIsAuth={setIsAuth}></JobDetailPage>}></Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default App;
