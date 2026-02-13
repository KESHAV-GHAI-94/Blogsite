import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../../components/Comments.jsx";
import axios from "axios";
const Detailedpage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

const error=""

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/posts/post/${id}`,
        { withCredentials: true }
      );
      setPost(res.data.post);
      setComments(res.data.comments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
//like
const handleLike = async () => {
  try {
    setPost((prev) => ({
      ...prev,
      isLiked: true,
      like_count: prev.like_count + 1,
    }));
    await axios.post(
      `http://localhost:3000/posts/${post.id}/like`,
      {},
      { withCredentials: true }
    );
  } catch (err) {
    console.error(err);
    fetchPost(); 
  }
};
const handleUnlike = async () => {
  try {
    setPost((prev) => ({
      ...prev,
      isLiked: false,
      like_count: prev.like_count - 1,
    }));
    await axios.post(
      `http://localhost:3000/posts/${post.id}/unlike`,
      {},
      { withCredentials: true }
    );
  } catch (err) {
    console.error(err);
    fetchPost(); 
  }
};
  if (loading)
    return <h2 className="text-center mt-10">Loading...</h2>;
  if (error)
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  if (!post)
    return <h2 className="text-center mt-10">Post not found</h2>;
    return (
      <div className="w-full bg-gray-100 mx-auto 4 border border-gray-200 shadow-md">
      <div className="w-[800px] bg-grey-100 mx-auto px-4 mb-5 border border-gray-200 shadow-md rounded">
      {post.image_base64 && (
        <img
          src={`data:image/jpeg;base64,${post.image_base64}`}
          alt={post.title}
          className="w-full h-[400px] mt-5 object-cover rounded-2xl mb-2"
        />
      )}
      <h1 className="text-3xl font-bold text-gray-900 ">
        {post.title}
      </h1>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
  <span>~ {post.author_name}</span>
  <div className="flex items-center gap-3">
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 transition`}>👍<span>{post.like_count}</span>
    </button>

    <button onClick={handleUnlike} className="flex items-center px-6 py-2 rounded-full border bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200">👎</button>

  </div>

  <span>{new Date(post.created_at).toLocaleDateString()}</span>
</div>

      <p className="text-gray-700 px-2 leading-relaxed mb-4">
        {post.description}
      </p>
      <Comments
        postId={post.id}
        comments={comments}
        fetchPost={fetchPost}
      />
    </div>
    </div>
  );
};
export default Detailedpage;