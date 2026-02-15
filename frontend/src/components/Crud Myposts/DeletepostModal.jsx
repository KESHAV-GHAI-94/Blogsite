import React from "react";

const DeletepostModal = ({ setShowDeleteModal, handleDelete }) => {
  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setShowDeleteModal(false)}
      >
        <div
          className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold text-red-600 mb-4">Delete Post</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this post? This action cannot be
            undone.
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
    </div>
  );
};

export default DeletepostModal;
