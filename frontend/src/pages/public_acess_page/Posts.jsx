import { useEffect, useState } from "react";
import { List, LayoutGrid } from "lucide-react";
import axios from "axios";
import Cards from "../../components/Cards";
const Posts = () => {
const [view, setView] = useState("grid");
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
    fetchPosts();
}, []);
const fetchPosts = async () => {
    try {
    const res = await axios.get("http://localhost:3000/posts");
    setPosts(res.data.posts);
    } catch (error) {
    console.error("Error fetching posts:", error);
    setError("Failed to load posts");
    } finally {
    setLoading(false);
    }
};
if (loading)
    return (
    <div className="grid grid-cols-3 gap-6 mt-10">
        {[...Array(6)].map((_, i) => (
        <div
            key={i}
            className="h-60 bg-gray-200 animate-pulse rounded-2xl"
        ></div>
        ))}
    </div>
    );
if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
return (
    <div className="max-w-7xl mx-auto mt-10 px-4 mb-30">
    <div className="flex justify-end gap-4 mb-6">
    <button onClick={() => setView("grid")} className={`px-4 py-2 rounded-lg ${view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"}`}><LayoutGrid /></button>
    <button onClick={() => setView("list")} className={`px-4 py-2 rounded-lg ${view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"}`}><List /></button>
    </div>
    {posts.length === 0 ? (
        <p>No posts available</p>
    ) : (
        <div className={`${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8": "flex flex-col gap-8"}`}>
        {posts.map((post) => (
            <Cards key={post.id} post={post} view={view} />
        ))}
        </div>
    )}
    </div>
);
};
export default Posts;
