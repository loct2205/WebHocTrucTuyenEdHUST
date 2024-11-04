import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import UpdatePassword from './pages/UpdatePassword';

import Dashboard from './pages/Dashboard';
import Settings from './components/core/Dashboard/Settings/Settings';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-[calc(100vh-3.5rem)]"> 
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          <Route path="/dashboard" element={<Dashboard />}>
            {/* <Route path="my-profile" element={<MyProfile />} /> */}
            <Route path="settings" element={<Settings />} />
          </Route>

        </Routes>
      </div>
      <Footer />
    </Router>
  );
};
export default App;