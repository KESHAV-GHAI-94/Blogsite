import React, { useEffect, useState } from "react";
import axios from "axios";
export function useMyposts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchMyPosts();
  }, []);
  const fetchMyPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:3000/account/my-posts", {
        withCredentials: true,
      });
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
      setError("Failed to load your posts");
    } finally {
      setLoading(false);
    }
  };
  return {
    posts,
    loading,
    error,
    fetchMyPosts,
  };
}
