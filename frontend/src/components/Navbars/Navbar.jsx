import React, { useState, useEffect, useRef } from "react";
import blogge from "../../assets/blogge.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ChevronsDown,Menu, X } from "lucide-react";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Authenticate, setAuthenticate] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const[mobileOpen,setMobileOpen] = useState(false);
  useEffect(() => {
    const token = Cookies.get("authToken");
    setAuthenticate(!!token);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
  <nav className="bg-linear-to-r from-blue-600 to-blue-500 shadow-lg px-4 md:px-8 py-3 h-20 flex items-center justify-between sticky top-0 z-50">
    <Link to="/">
      <img src={blogge} className="bloggeimg" alt="logo" />
    </Link>
    <div className="hidden md:flex gap-10 text-white font-semibold">
      <Link to="/" className="hover:text-yellow-300">
        Home
      </Link>
      <Link to="/posts" className="hover:text-yellow-300">
        Posts
      </Link>
    </div>
    <div className="hidden md:flex gap-6">
      {!Authenticate && location.pathname !== "/login" && (
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold"
        >
          Login
        </button>
      )}
      {!Authenticate && location.pathname !== "/sign-up" && (
        <button
          onClick={() => navigate("/sign-up")}
          className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold"
        >
          Signup
        </button>
      )}
      {Authenticate && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-white text-blue-600 px-5 py-2 rounded-full font-semibold"
          >
            Account <ChevronsDown size={18}/>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl">
              <Link to="/account/my-posts">
                <div className="px-4 py-3 rounded-t-[10px] hover:bg-blue-50">
                  My Posts
                </div>
              </Link>
                <hr className="border-gray-200" /> 
              <Link to="/account/create-post">
                <div className="px-4 py-3  hover:bg-blue-50">
                  Create Post
                </div>
              </Link>
              <hr className="border-gray-200" /> 
              <div
                onClick={() => {
                  Cookies.remove("authToken");
                  setAuthenticate(false);
                  navigate("/login");
                }}
                className="px-4 py-3 text-red-500 rounded-b-[10px] hover:bg-red-50 cursor-pointer"
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    <button
      className="md:hidden text-white"
      onClick={() => setMobileOpen(!mobileOpen)}
    >
      {mobileOpen ? <X size={28}/> : <Menu size={28}/>}
    </button>
    {mobileOpen && (
      <div className="absolute top-20 left-0 w-full bg-white shadow-lg md:hidden">
        <div className="flex flex-col p-4 gap-4">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <hr className="border-gray-200" /> 
          <Link to="/posts" onClick={() => setMobileOpen(false)}>
            Posts
          </Link>
          <hr className="border-gray-200" /> 
          {!Authenticate && (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
                className="text-left text-blue-600"
              >
                Login
              </button>
              <hr className="border-gray-200" /> 
              <button
                onClick={() => {
                  navigate("/sign-up");
                  setMobileOpen(false);
                }}
                className="text-left text-blue-600"
              >
                Signup
              </button>
            </>
          )}
          {Authenticate && (
            <>
              <Link to="/account/my-posts" onClick={() => setMobileOpen(false)}>
                My Posts
              </Link>
              <hr className="border-gray-200" /> 
              <Link to="/account/create-post" onClick={() => setMobileOpen(false)}>
                Create Post
              </Link>
              <hr className="border-gray-200" /> 
              <button
                onClick={() => {
                  Cookies.remove("authToken");
                  setAuthenticate(false);
                  navigate("/login");
                  setMobileOpen(false);
                }}
                className="text-red-500 text-left"
              >
                Logout
              </button>
            </>

          )}

        </div>

      </div>

    )}

  </nav>

);

};

export default Navbar;
