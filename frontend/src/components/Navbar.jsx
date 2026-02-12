import React, { useState, useEffect } from "react";
import blogge from "../assets/blogge.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = Cookies.get("authToken");
        setIsAuthenticated(!!token);
    }, []);
    return (
        <nav className="bg-[#6ca1eb] shadow-md px-6 py-3 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Link to="/"><img src={blogge} className="bloggeimg" alt="logo" /></Link>
        </div>
        <div className="flex gap-6 text-white font-semibold">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/posts" className="hover:text-yellow-300">Posts</Link>
        </div>
        <div className="flex gap-8">
            {!isAuthenticated && location.pathname !== "/login" && (
            <button
                onClick={() => navigate("/login")}
                className="bg-white text-[#6ca1eb] px-4 py-1 rounded-full font-semibold hover:bg-gray-100"
            >
                Login
            </button>
            )}
            {!isAuthenticated && location.pathname !== "/sign-up" && (
            <button
                onClick={() => navigate("/sign-up")}
                className="bg-white text-[#6ca1eb] px-4 py-1 rounded-full font-semibold hover:bg-gray-100"
            >
                Signup
            </button>
            )}
            {isAuthenticated && (
            <button
                onClick={() => {
                Cookies.remove("authToken");
                setIsAuthenticated(false);
                navigate("/login");
                }}
                className="bg-white text-red-500 px-4 py-1 rounded-full font-semibold hover:bg-gray-100"
            >
                Logout
            </button>
            )}
        </div>
        </nav>
    );
    };

export default Navbar;
