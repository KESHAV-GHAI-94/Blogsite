import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ post, view }) => {
const shortDesc =
    post.description.length > 20
    ? post.description.substring(0, 20) + "..."
    : post.description;
return (
    <Link to={`/posts/post/${post.id}`} className="detailedpost">
    <div
        className={`bg-white rounded-2xl border border-gray-200 
        hover:shadow-xl hover:-translate-y-1 
        transition-all duration-300 overflow-hidden group
        flex flex-col
        ${view === "list" ? "w-[800px] h-[200px] flex-row" : ""}`}
        >
        {post.image_url && (
        <div className={`relative ${view === "list" ? "w-2/6" : ""}`}>
            <img
            src={post.image_url}
            loading="lazy"
            alt={post.title}
            className={`w-full object-cover transition-all duration-500
            ${view === "grid" ? "h-[220px]" : "h-full w-[250px]"}
            group-hover:scale-105`}
            />
            <div
            className="absolute inset-0 bg-black/10 backdrop-blur-sm opacity-0 
                group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
            >
            <span className="text-white font-semibold text-lg">
                View Post
            </span>
            </div>
        </div>
        )}
        <div className="px-5 py-2 flex flex-col justify-between">
        <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">
            {post.title}
            </h2>
            <p className="text-gray-500 text-sm">
            {view === "list" ? post.description : shortDesc}
            </p>
        </div>
        </div>
    </div>
    </Link>
);
};

export default Cards;
