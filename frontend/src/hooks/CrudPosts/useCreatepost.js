import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export function useCreatepost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }
      await axios.post("http://localhost:3000/posts/create-post", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post Created Successfully 🎉");
      navigate("/account/my-posts");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };
  return {
    title,
    setTitle,
    description,
    setDescription,
    image,
    preview,
    loading,
    handleImageChange,
    handleSubmit,
  };
}
