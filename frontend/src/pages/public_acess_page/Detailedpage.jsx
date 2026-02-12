import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detailedpage = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeReply, setActiveReply] = useState(null);
const [replyText, setReplyText] = useState("");

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
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };
  /* ================= LIKE ================= */
const handleLike = async () => {
  try {
    // optimistic update
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
    fetchPost(); // rollback if fails
  }
};
const handleUnlike = async () => {
  try {
    // optimistic update
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
    fetchPost(); // rollback if fails
  }
};

  /* ================= ADD COMMENT ================= */

  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `http://localhost:3000/posts/${post.id}/comment`,
        { comment: newComment },
        { withCredentials: true }
      );

      setNewComment("");
      fetchPost(); // refresh comments
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= ADD REPLY ================= */

const addReply = async (commentId) => {
  if (!replyText.trim()) return;

  try {
    await axios.post(
      `http://localhost:3000/posts/${post.id}/comment/${commentId}/reply`,
      { comment: replyText },
      { withCredentials: true }
    );

    setReplyText("");
    setActiveReply(null);
    fetchPost();
  } catch (err) {
    console.error(err);
  }
};


  /* ================= DELETE ================= */

  const deleteComment = async (commentId) => {
    try {
      await axios.post(
        `http://localhost:3000/posts/${post.id}/comment/${commentId}/delete`,
        {},
        { withCredentials: true }
      );

      fetchPost();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <h2 className="text-center mt-10">Loading...</h2>;

  if (error)
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;

  if (!post)
    return <h2 className="text-center mt-10">Post not found</h2>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">

      {post.image_base64 && (
        <img
          src={`data:image/jpeg;base64,${post.image_base64}`}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-2xl mb-6"
        />
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>By {post.author_name}</span>
        <span>
          {new Date(post.created_at).toLocaleDateString()}
        </span>
      </div>

      {/* Like Button */}
      <button
        onClick={handleLike}
        className="mb-6 text-sm font-medium"
      >
        ({post.like_count})❤️ Like 
      </button>
      <button
        onClick={handleUnlike}
        className="mb-6 text-sm font-medium"
      >💔 Unlike
      </button>

      <p className="text-gray-700 leading-relaxed mb-10">
        {post.description}
      </p>

      {/* Add Comment */}
      <div className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full border p-3 rounded-lg mb-3"
        />
        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Comment
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Comments</h2>

    <CommentList
    comments={comments}
    addReply={addReply}
    deleteComment={deleteComment}
    activeReply={activeReply}
    setActiveReply={setActiveReply}
    replyText={replyText}
    setReplyText={setReplyText}
/>

    </div>
  );
};

export default Detailedpage;
const CommentList = ({
  comments,
  addReply,
  deleteComment,
  activeReply,
  setActiveReply,
  replyText,
  setReplyText,
}) => {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="border-l-2 pl-4">

          <p className="text-sm font-semibold">
            {comment.commenter_name}
          </p>

          <p className="text-gray-700 text-sm mb-2">
            {comment.comment}
          </p>

          <div className="flex gap-4 text-xs text-blue-500 mb-2">
            <button onClick={() => setActiveReply(comment.id)}>
              Reply
            </button>
            <button onClick={() => deleteComment(comment.id)}>
              Delete
            </button>
          </div>

          {/* 🔥 Reply Input Dropdown */}
          {activeReply === comment.id && (
            <div className="mt-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full border p-2 rounded-lg text-sm mb-2"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => addReply(comment.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setActiveReply(null);
                    setReplyText("");
                  }}
                  className="text-gray-500 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Recursive Replies */}
          {comment.replies.length > 0 && (
            <div className="ml-6 mt-2">
              <CommentList
                comments={comment.replies}
                addReply={addReply}
                deleteComment={deleteComment}
                activeReply={activeReply}
                setActiveReply={setActiveReply}
                replyText={replyText}
                setReplyText={setReplyText}
              />
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

