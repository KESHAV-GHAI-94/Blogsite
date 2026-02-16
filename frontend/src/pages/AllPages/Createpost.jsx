import { useCreatepost } from "../../hooks/Page/useCreatepost";
const Createpost = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    preview,
    loading,
    handleImageChange,
    handleSubmit,
  } = useCreatepost();
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center  items-start pt-12">
      <div className="bg-white w-full max-w-3xl rounded-3xl sm:mx-2 shadow-xl sm:p-5 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          ✍️ Create New Blog
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Upload Image
            </label>
            <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-blue-400 transition">
              <span className="text-gray-500">Click to upload image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required
              />
            </label>
            {preview && (
              <div className="mt-4 justify-self-center-safe">
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-2xl max-h-60 object-cover"
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
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full border border-gray-300 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Description
            </label>
            <textarea
              required
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your blog content..."
              className="w-full border border-gray-300 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition shadow-lg"
            >
              {loading ? "Creating..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createpost;
