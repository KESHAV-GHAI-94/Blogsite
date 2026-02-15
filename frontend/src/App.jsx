import React from "react";
import Signup from "./pages/authpage/Signup";
import Navbar from "./components/Navbars/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/public_acess_page/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/authpage/Login";
import Forgetpassword from "./pages/authpage/forget page/Forgetpassword";
import ResetPassword from "./pages/authpage/forget page/Resetpassword";
import Posts from "./pages/public_acess_page/Posts";
import Detailedpage from "./pages/public_acess_page/Detailedpage";
import Myposts from "./pages/Crud pages/Myposts";
import Footer from "./components/Navbars/Footer";
import Createpost from "./pages/Crud pages/Createpost";
const App = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/reset-password" element={<ResetPassword />} />
          <Route path="/login/forget-password" element={<Forgetpassword />} />
          <Route path="/posts/post/:id" element={<Detailedpage />} />
          <Route path="/account/my-posts" element={<Myposts />} />
          <Route path="/account/create-post" element={<Createpost />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
