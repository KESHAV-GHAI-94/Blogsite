import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
export function useMycard(post, refreshPosts) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(null);
  const shortDesc =
    post?.description?.length > 20
      ? post.description.substring(0, 20) + "..."
      : post?.description || "";
  const handleDelete = async () => {
    try {
      await axios.post(
        `http://localhost:3000/account/my-posts/delete/${post.id}`,
        {},
        { withCredentials: true },
      );
      setShowDeleteModal(false);
      refreshPosts();
      toast.success("Post Deleted Successfully 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }
      await axios.post(
        `http://localhost:3000/account/my-posts/update/${post.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setShowModal(false);
      refreshPosts();
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to update post");
    }
  };
  return {
    shortDesc,
    showModal,
    setShowModal,
    showDeleteModal,
    setShowDeleteModal,
    title,
    setTitle,
    description,
    setDescription,
    image,
    setImage,
    handleDelete,
    handleUpdateSubmit,
  };
}
