import Comments from "../../components/comments.jsx";
import { useDetailedpage } from "../../hooks/PublicAccess/useDetailedpage.js";
const Detailedpage = () => {
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
    <div className="w-[ 800px ] bg-grey-100 mx-auto px-4 mb-4 border border-gray-200 shadow-md rounded">
      {post.image_base64 && (
        <img
          src={`data:image/jpeg;base64,${post.image_base64}`}
          alt={post.title}
          className="w-[700px] h-[400px] mt-5 object-cover rounded-2xl mb-2 mx-auto"
        />
      )}
      <h1 className="text-3xl font-bold text-gray-900 ">{post.title}</h1>
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
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-700 px-2 leading-relaxed mb-4">
        {post.description}
      </p>
      <Comments postId={post.id} comments={comments} fetchPost={fetchPost} currentUserId={currentUserId} />
    </div>
  );
};
export default Detailedpage;
