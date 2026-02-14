import React, { useEffect, useState } from "react";
import axios from "axios";
import Mypost_Cards from "../components/Mypost_cards";

const Myposts = () => {
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    fetchMyPosts();
}, []);

const fetchMyPosts = async () => {
    try {
    const res = await axios.get("http://localhost:3000/account/my-posts", {
        withCredentials: true,
    });
    setPosts(res.data.posts);
    } catch (err) {
    console.error(err);
    setError("Failed to load your posts");
    } finally {
    setLoading(false);
    }
};

if (loading) return <p className="text-center mt-10">Loading...</p>;
if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

return (
    <div className="max-w-7xl mx-auto mt-10 px-4 mb-20">
    <h1 className="text-2xl font-bold mb-6">My Posts</h1>
    {posts.length === 0 ? (
        <p>You haven’t created any posts yet.</p>
    ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
            <>
            <Mypost_Cards
                key={post.id}
                post={post}
                view="grid"
                refreshPosts={fetchMyPosts}
            />
            </>
        ))}
        </div>
    )}
    </div>
);
};

export default Myposts;
