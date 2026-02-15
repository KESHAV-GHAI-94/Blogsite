import Comments from "../../components/comments.jsx";
import { useState } from "react";
import { useDetailedpage } from "../../hooks/PublicAccess/useDetailedpage.js";
import {MessageCircleMore,MessageCircleOff} from "lucide-react"; 
const Detailedpage = () => {
  const [showComments, setShowComments] = useState(false);
  const {
    post,
    loading,
    error,
    comments,
    fetchPost,
    handleLike,
    handleUnlike,
    currentUserId
  } = useDetailedpage();
  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  if (!post) return <h2 className="text-center mt-10">Post not found</h2>;
  return (
    
    <div className="w-[ 800px ] mt-10 detailedpage bg-grey-100 mx-auto px-6 py-4 mb-4 border border-gray-200 shadow-md rounded-[20px]">
      {post.image_base64 && (
        <img
          src={`data:image/jpeg;base64,${post.image_base64}`}
          alt={post.title}
          className="w-[700px] h-[400px] mt-5 mb-5 object-cover rounded-2xl mb-2 mx-auto"
        />
      )}
      <h1 className="text-3xl font-bold mb-5 text-gray-900 ">{post.title}</h1>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <span>~ {post.author_name}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 transition`}
          >
            👍<span>{post.like_count}</span>
          </button>
          <button
            onClick={handleUnlike}
            className="flex items-center px-6 py-2 rounded-full border bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          >
            👎
          </button>
        </div>
          <button
  onClick={() => setShowComments(!showComments)}
  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
>
  {showComments ? (
    <MessageCircleOff size={35} />
  ) : (
    <>
      <MessageCircleMore size={35} />
      <span>({comments.length})</span>
    </>
  )}
</button>
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
      </div>
      <p className="text-xl mb-2 mt-5">Description</p>
      <p className="text-gray-700 ml-2 px-2 leading-relaxed mb-4">
        {post.description}
      </p>
{showComments && (
  <div className="mt-4 mb-2 bg-gray-50 border border-gray-200 rounded-xl p-2 shadow-sm transition-all duration-300">
    <Comments
      postId={post.id}
      comments={comments}
      fetchPost={fetchPost}
      currentUserId={currentUserId}
    />
  </div>
)}
    </div>
    
  );
};
export default Detailedpage;
