import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

const Mypost_Cards = ({ post, view, refreshPosts }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const shortDesc =
    post.description.length > 20
      ? post.description.substring(0, 20) + "..."
      : post.description;
  const handleDelete = async () => {
  try {
    await axios.post(
      `http://localhost:3000/account/my-posts/delete/${post.id}`,
      {},
      { withCredentials: true }
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

  return (
    <>
      <Link to={`/posts/post/${post.id}`} className="detailedpost">
        <div
          className={`relative bg-white rounded-3xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group ${
            view === "list" ? "max-w-4xl mx-auto flex" : ""
          }`}
        >
          {post.image_base64 && (
            <div className={`relative ${view === "list" ? "w-2/6" : ""}`}>
              <img
                src={`data:image/jpeg;base64,${post.image_base64}`}
                loading="lazy"
                alt={post.title}
                className={`w-full object-cover transition-all duration-500
            ${view === "grid" ? "h-[220px]" : "h-full w-[250px]"}
            group-hover:scale-105`}
              />
            </div>
          )}
          <div className="px-5 py-2 flex flex-row justify-between w-full">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {post.title}
              </h2>

              <p className="text-gray-500 text-sm">
                {view === "list" ? post.description : shortDesc}
              </p>
            </div>

            <div className="flex gap-2 z-20">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="bg-blue-500 text-white px-5 py-1 rounded-lg text-xs hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDeleteModal(true);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Link>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              ✏️ Update Post
            </h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Change Image
                </label>

                <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition">
                  <span className="text-gray-500 text-sm">
                    Click to upload new image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>

                {image && (
                  <div className="mt-4 justify-self-center-safe">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="rounded-xl max-h-40 object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Write your description..."
                />
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={() => setShowDeleteModal(false)}
  >
    <div
      className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-scaleIn"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold text-red-600 mb-4">
        ⚠️ Delete Post
      </h2>

      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this post?  
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow-md"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Mypost_Cards;
