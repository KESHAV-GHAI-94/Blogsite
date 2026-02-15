import React, { useState } from "react";
import axios from "axios"; 
import {SendHorizontal} from "lucide-react";
import {toast } from "react-toastify";
const Comments = ({ postId, comments, fetchPost, currentUserId }) => {
const [newComment, setNewComment] = useState("");
const addComment = async () => {
    if (!newComment.trim()) return;
    try{
    const res =await axios.post(
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
    <div className=" border-gray-500 pt-3">
    <div className="flex gap-3 mb-3">
        <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 border-b border-gray-300 focus:outline-none resize-none"
        />
        <button
        onClick={addComment}
        className="px-4 py-2 bg-blue-500 text-white rounded-full"
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

const CommentItem = ({ comment, postId, fetchPost,currentUserId }) => {
const [showReply, setShowReply] = useState(false);
const [replyText, setReplyText] = useState("");
const addReply = async () => {
    if (!replyText.trim()) return;
    try{
    await axios.post(
    `http://localhost:3000/posts/${postId}/comment/${comment.id}/reply`,
    { comment: replyText },
    { withCredentials: true },
    );
    setReplyText("");
    setShowReply(false);
    fetchPost();
}catch (err) {
    if (err.response?.status === 401) {
    toast.error("Please login first to add a reply");
    } else {
    toast.error("Failed to add comment");
    }
    console.error(err);
  }
};
console.log("currentUserId:", currentUserId);
console.log("comment.user_id:", comment.user_id);
const deleteComment = async () => {
    try{
    await axios.post(
    `http://localhost:3000/posts/${postId}/comment/${comment.id}/delete`,
    {},
    { withCredentials: true },
    );
    fetchPost();
}catch (err) {
    if (err.response?.status === 401) {
    toast.error("Please login first to delete the comment");
    } else {
    toast.error("Failed to add comment");
    }
    console.error(err);
}
};
return (
    <div className="mb-2 p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition">
    <div className="flex gap-4  rounded-xl hover:bg-gray-50 transition">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
        {comment.commenter_name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
        <p className="font-semibold text-sm text-gray-800">{comment.commenter_name}</p>
        <p className="text-grey-700 text-sm mt-1">{comment.comment}</p>
        <div className="flex gap-6 text-xs text-gray-500 mt-2 font-medium">
            <button
            onClick={() => setShowReply(!showReply)}
            className="hover:text-black"
            >
            Reply
            </button>
            {currentUserId === comment.user_id && (
            <button onClick={deleteComment} className="hover:text-red-600">
            Delete
            </button>
            )}
        </div>
        {showReply && (
            <div className="mt-3 flex gap-2">
            <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 border-b border-gray-300 focus:border-black focus:outline-none py-1 text-sm"
            />
            <button
                onClick={addReply}
                className="px-2 py-1 bg-black text-white rounded-full text-xs hover:bg-gray-800 transition"
            >
                Reply
            </button>
            </div>
        )}
        </div>
    </div>
    {comment.replies?.length > 0 && (
        <div className="ml-2 mt-2 border-l-2 border-gray-100 pl-1">

        {comment.replies.map((reply) => (
            <CommentItem
            key={reply.id}
            comment={reply}
            postId={postId}
            fetchPost={fetchPost}
            currentUserId={currentUserId}
            />
        ))}
        </div>
    )}
    </div>
);
};