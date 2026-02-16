import Comments from "../../components/comments.jsx";
import { useState } from "react";
import { useDetailedpage } from "../../hooks/Page/useDetailedpage.js";
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
  <div className="min-h-screen  bg-gray-100 flex justify-center items-start py-6 px-3">
    <div className="w-full p-3 flex-col max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
  {post.image_base64 && (
    <img
      src={`data:image/jpeg;base64,${post.image_base64}`}
      alt="background"
      className="absolute mt-5 sm:p-4 rounded-6xl inset-0 w-full h-full object-cover blur-xxs scale-110"
    />
  )}
</div>
      <div className="pt-6 pb-6 px-5 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {post.title}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {post.author_name}
        </p>
        <p className="text-gray-400 text-xs mb-4">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed px-2">
          {post.description}
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            👍 {post.like_count}
          </button>
          <button
            onClick={handleUnlike}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            👎
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-blue-600"
          >
            <MessageCircleMore size={24} />
            ({comments.length})
          </button>
        </div>
      </div>
        {showComments && (
          <div className="border-t bg-gray-50 p-4">
            <Comments
              postId={post.id}
              comments={comments}
              fetchPost={fetchPost}
              currentUserId={currentUserId}
            />
          </div>
        )}
    </div>
  </div>
);

};
export default Detailedpage;
