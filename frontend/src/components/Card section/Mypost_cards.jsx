import React from "react";
import { Link } from "react-router-dom";
import { useMycard } from "../../hooks/Cards/useMycard";
import UpdatepostModal from "../Modals/UpdatepostModal";
import DeletepostModal from "../Modals/DeletepostModal";
import { Trash2, Pencil} from "lucide-react";
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
                className={`w-full  object-cover transition-all duration-500
            ${view === "grid" ? "h-[300px] " : "h-full w-[250px]"}
            group-hover:scale-105`}
              />
            </div>
          )}
          <div className="px-5 mt-2 py-2 flex flex-row justify-between w-full">
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm">
                {view === "list" ? post.description : shortDesc}
              </p>
            </div>
            <div className="flex items-center gap-3 z-20">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(true);
                }}
                className="flex items-center justify-center w-11 h-11 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
              ><Pencil />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowDeleteModal(true);
                }}
                className="flex items-center justify-center w-11 h-11 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              ><Trash2 />
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
