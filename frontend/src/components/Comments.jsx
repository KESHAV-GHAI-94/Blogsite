import React, { useState } from "react";
import axios from "axios";
const Comments = ({ postId, comments, fetchPost, currentUserId }) => {
const [newComment, setNewComment] = useState("");
const addComment = async () => {
    if (!newComment.trim()) return;
    const res =await axios.post(
    `http://localhost:3000/posts/${postId}/comment`,
    { comment: newComment },
    { withCredentials: true },
    );
    console.log(res.data);
    setNewComment("");
    fetchPost();
};
return (
    <div className="border-t border-gray-500 pt-3">
    <div className="flex gap-3 mb-3">
        <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 border-b border-gray-300 focus:outline-none resize-none"
        />
        <button
        onClick={addComment}
        className="px-4 py-2 bg-blue-600 text-white rounded-full"
        >
        Comment
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
    await axios.post(
    `http://localhost:3000/posts/${postId}/comment/${comment.id}/reply`,
    { comment: replyText },
    { withCredentials: true },
    );
    setReplyText("");
    setShowReply(false);
    fetchPost();
    
};
console.log("currentUserId:", currentUserId);
console.log("comment.user_id:", comment.user_id);
const deleteComment = async () => {
    await axios.post(
    `http://localhost:3000/posts/${postId}/comment/${comment.id}/delete`,
    {},
    { withCredentials: true },
    );
    fetchPost();
};
return (
    <div className="mb-4 border border-gray-300 rounded-xl">
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
                className="px-4 py-1 bg-black text-white rounded-full text-xs hover:bg-gray-800 transition"
            >
                Reply
            </button>
            </div>
        )}
        </div>
    </div>
    {comment.replies?.length > 0 && (
        <div className="ml-14 mt-3 border-l border-gray-200 pl-6">
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