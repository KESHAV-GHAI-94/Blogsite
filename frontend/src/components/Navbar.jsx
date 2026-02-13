import React, { useState, useEffect,useRef} from "react";
import blogge from "../assets/blogge.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ChevronsDown } from "lucide-react";
const Navbar = () => {
const navigate = useNavigate();
const location = useLocation();
const [Authenticate, setAuthenticate] = useState(false);
const [showDropdown, setShowDropdown] = useState(false);
const dropdownRef = useRef(null);

useEffect(() => {
    const token = Cookies.get("authToken");
    setAuthenticate(!!token);
}, []);
useEffect(() => {
const handleClickOutside = (event) => {
    if (
    dropdownRef.current &&
    !dropdownRef.current.contains(event.target)
    ) {
    setShowDropdown(false);
    }
};
    document.addEventListener("mousedown", handleClickOutside);
return () => {
    document.removeEventListener("mousedown", handleClickOutside);
};
}, []);

return (
    <nav className="bg-[#6ca1eb] shadow-md px-6 py-3 h-20 flex items-center justify-between">
    <div className="flex items-center gap-3">
        <Link to="/">
        <img src={blogge} className="bloggeimg" alt="logo" />
        </Link>
    </div>
    <div className="flex gap-6 text-white font-semibold">
        <Link to="/" className="hover:text-yellow-300">
        Home
        </Link>
        <Link to="/posts" className="hover:text-yellow-300">
        Posts
        </Link>
    </div>
    <div className="flex gap-8">
        {!Authenticate && location.pathname !== "/login" && (
        <button
            onClick={() => navigate("/login")}
            className="bg-white text-[#6ca1eb] px-4 py-1 rounded-full font-semibold hover:bg-gray-100"
        >
            Login
        </button>
        )}
        {!Authenticate && location.pathname !== "/sign-up" && (
        <button
            onClick={() => navigate("/sign-up")}
            className="bg-white text-[#6ca1eb] px-4 py-1 rounded-full font-semibold hover:bg-gray-100"
        >
            Signup
        </button>
        )}
        {Authenticate && (
        <div className="relative"  ref={dropdownRef}>
            <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-white text-[#6ca1eb] px-4 py-1 rounded-full font-semibold hover:bg-gray-100"
            >
                <div className="flex gap-1">
            Account <ChevronsDown /></div>
            </button>
            {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                <Link to="/account/my-posts">
                <button
                onClick={() => {
                    setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                My Posts
                </button>
                </Link>
                <Link to="/account/create-post"> 
                <button
                onClick={() => {
                    setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                Create Post
                </button>
                </Link>
                <hr className="my-2" />
                <button
                onClick={() => {
                    Cookies.remove("authToken");
                    setAuthenticate(false);
                    navigate("/login");
                }}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                Logout
                </button>
            </div>
            )}
        </div>
        )}
    </div>
    </nav>
);
};

export default Navbar;
