import React, { useEffect, useState } from "react";
import blogge from "../../assets/blogge.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Footer = () => {
  const [Authenticate, setAuthenticate] = useState(false);
  useEffect(() => {
    const token = Cookies.get("authToken");
    setAuthenticate(!!token);
  }, []);
  return (
    <footer className="bg-linear-to-r from-blue-600 to-blue-500 text-white px-4 sm:px-6 md:px-12 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src={blogge} alt="logo" className="h-18 mb-4" />
          <p className="text-sm text-gray-200 leading-relaxed">
            Blogge is a modern blogging platform where users can share ideas,
            stories, and experiences with the world.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/posts" className="hover:text-yellow-300">
                Posts
              </Link>
            </li>
            {Authenticate && (
            <li>
              <Link to="/account/my-posts" className="hover:text-yellow-300">
                My Posts
              </Link>
            </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
          <p className="text-sm mb-2">📧 keshavghai94@gmail.com</p>
          <p className="text-sm mb-2">📍 India</p>
        </div>
      </div>
      <div className="border-t border-white/30 mt-8 pt-2 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} Blogge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
