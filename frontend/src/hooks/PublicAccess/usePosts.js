import { useEffect, useState } from "react";
import axios from "axios";
export function usePosts() {
  const [view, setView] = useState("grid");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;
  useEffect(() => {
    fetchPosts(page);
  }, [page]);
  const fetchPosts = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/posts?page=${pageNumber}&limit=${limit}`
      );
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
      setError(null);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };
  return {
    view,
    setView,
    posts,
    loading,
    error,
    page,
    setPage,
    totalPages
  };

}