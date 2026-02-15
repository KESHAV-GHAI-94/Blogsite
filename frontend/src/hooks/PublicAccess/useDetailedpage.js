import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export function useDetailedpage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/posts/post/${id}`, {
        withCredentials: true,
      });
      setPost(res.data.post);
      setComments(res.data.comments);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [id]);
  //like
  const handleLike = async () => {
    try {
      setPost((prev) => ({
        ...prev,
        isLiked: true,
        like_count: prev.like_count + 1,
      }));
      await axios.post(
        `http://localhost:3000/posts/${id}/like`,
        {},
        { withCredentials: true },
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
        `http://localhost:3000/posts/${id}/unlike`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err);
      fetchPost();
    }
  };
  return {
    post,
    loading,
    error,
    comments,
    fetchPost,
    handleLike,
    handleUnlike,
  };
}
