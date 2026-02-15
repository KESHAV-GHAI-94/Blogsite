import React from "react";
import { Link } from "react-router-dom";
import { useMycard } from "../../hooks/ComponentHooks/useMycard";
import UpdatepostModal from "./UpdatepostModal";
import DeletepostModal from "./DeletepostModal";
const Mypost_Cards = ({ post, view, refreshPosts }) => {
  const {
    showModal,
    handleUpdateSubmit,
    setShowModal,
    image,
    setImage,
    shortDesc,
    showDeleteModal,
    setTitle,
    description,
    setDescription,
    setShowDeleteModal,
    title,
    handleDelete,
  } = useMycard(post, refreshPosts);
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
        <UpdatepostModal
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      )}
      {showDeleteModal && (
        <DeletepostModal
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Mypost_Cards;
