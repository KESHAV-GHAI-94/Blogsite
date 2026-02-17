import React, { useState } from "react";
import axios from "axios";
import { SendHorizontal } from "lucide-react";
import { toast } from "react-toastify";
const Comments = ({ postId, comments, fetchPost, currentUserId }) => {
  const [newComment, setNewComment] = useState("");
  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:3000/posts/${postId}/comment`,
        { comment: newComment },
        { withCredentials: true },
      );
      console.log(res.data);
      setNewComment("");
      fetchPost();
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login first to add a comment");
      } else {
        toast.error("Failed to add comment");
      }
      console.error(err);
    }
  };

  return (
    <div className=" border-gray-500 pt-2">
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1  border-b border-gray-300 focus:outline-none resize-none"
        />
        <button
          onClick={addComment}
          className="px-2 py-0.5 bg-blue-500 text-white rounded-full"
        >
          <SendHorizontal size={30} />
        </button>
      </div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          fetchPost={fetchPost}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};
export default Comments;

const CommentItem = ({
  comment,
  postId,
  fetchPost,
  currentUserId,
  depth = 0,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const addReply = async () => {
    if (!replyText.trim()) return;
    try {
      await axios.post(
        `http://localhost:3000/posts/${postId}/comment/${comment.id}/reply`,
        { comment: replyText },
        { withCredentials: true }
      );
      setReplyText("");
      setShowReply(false);
      setShowReplies(true);
      fetchPost();
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login first to add a reply");
      } else {
        toast.error("Failed to add reply");
      }
      console.error(err);
    }
  };
  const deleteComment = async () => {
    try {
      await axios.post(
        `http://localhost:3000/posts/${postId}/comment/${comment.id}/delete`,
        {},
        { withCredentials: true }
      );
      fetchPost();
    } catch {
      toast.error("Delete failed");
    }
  };
  return (
    <div className="w-full  hover:bg-gray-100 rounded-lg transition-all duration-200">
      <div
        className="flex gap-2 py-2  px-1 rounded-lg transition-all duration-200"
        style={{
          paddingLeft: `${Math.min(depth * 12, 36)}px`
        }}
      >
        <div className="w-8 h-8 flex-shrink-0 rounded-full  bg-linear-to-br from-blue-400 via-indigo-400 to-purple-400 flex items-center justify-center text-xs font-bold text-gray-700 shadow-sm">
          {comment.commenter_name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            {comment.commenter_name}
          </p>
          <p className="text-sm text-gray-700 mt-0.5 break-words leading-relaxed">
            {comment.comment}
          </p>
          <div className="flex gap-4 text-xs text-gray-500 mt-1.5">
            <button onClick={() => setShowReply(!showReply)}
              className="text-xs font-medium text-gray-500  hover:text-blue-600 transition">
              Reply
            </button>
            {currentUserId === comment.user_id && (
              <button
                onClick={deleteComment}
                className="text-xs font-medium text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            )}
            {comment.replies?.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                {showReplies
                  ? "Hide replies"
                  : `View replies (${comment.replies.length})`}
              </button>
            )}
          </div>
          {showReply && (
            <div className="flex items-center gap-2 mt-2">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="
                  flex-1
                  bg-gray-100
                  border border-gray-200
                  rounded-full
                  px-1 py-1.5
                  text-sm
                  outline-none
                  focus:ring-2 focus:ring-blue-400
                  focus:bg-white
                  transition
                "
                placeholder="Reply..."
              />
              <button
                onClick={addReply}
                className="
                  text-xs
                  font-semibold
                  text-blue-600
                  hover:text-blue-800
                  px-1 py-1
                  rounded-2xl
                  bg-blue-200
                  transition
                "
              >
                Reply
              </button>
            </div>
          )}
        </div>
      </div>
      {showReplies && comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          postId={postId}
          fetchPost={fetchPost}
          currentUserId={currentUserId}
          depth={depth + 1}
        />
      ))}
    </div>
  );
};
