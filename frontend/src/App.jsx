  import React from 'react';
  import Signup from './pages/Signup';
  import Navbar from './components/Navbar';
  import {Routes,Route} from "react-router-dom";
  import Home from './pages/Home';
  import VerifyOtp from './pages/Verifyotp';
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import Login from "./pages/Login";
  import Forgetpassword from "./pages/Forgetpassword";
  import ResetPassword from "./pages/Resetpassword";
  import Posts from "./pages/Posts";
  const App = () => {
    return (
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/posts" element ={<Posts/>}/>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path ="/login" element={<Login/>}/>
          <Route path="/login/reset-password" element={<ResetPassword />} />
          <Route path="/login/forget-password" element={<Forgetpassword/>}/>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  };

  export default App;