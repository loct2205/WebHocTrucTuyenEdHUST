import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/common/Navbar';

import Home from './pages/Home';
import Footer from './components/common/Footer';
import ReviewSlider from './components/common/ReviewSlider';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// import About from './pages/About';
// import Courses from './pages/Courses';
// import Contact from './pages/Contact';

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
    </div>
  );
};
export default App;