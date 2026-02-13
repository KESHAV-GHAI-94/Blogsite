import React from "react";
import imagbloghero from "../../assets/imagbloghero.png";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div
      className="h-screen w-full bg-center bg-cover relative flex items-center justify-center"
      style={{ backgroundImage: `url(${imagbloghero})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Create Your Own Blog Here
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Share your thoughts, ideas and stories with the world.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link to="/sign-up">
          <button
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-full text-white font-semibold shadow-lg"
          >
            Start Blogging
          </button></Link>
          <Link to="/posts">
          <button
            className="px-8 py-3 bg-white text-gray-800 hover:bg-gray-200 transition rounded-full font-semibold shadow-lg"
          >
            Explore Posts
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
