import Mypost_Cards from "../../components/Card section/Mypost_cards";
import { useMyposts } from "../../hooks/Page/useMyposts";
const Myposts = () => {
  const { posts, loading, error, fetchMyPosts } = useMyposts();

    if (loading)
    return (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 px-4 lg:px-40 mt-10">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="h-60 bg-gray-200 animate-pulse rounded-2xl w-full"
      ></div>
    ))}
  </div>);
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 mb-20">
      <h1 className="text-2xl font-bold mb-6">My Posts</h1>
      {posts.length === 0 ? (
        <p>You haven’t created any posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Mypost_Cards
              key={post.id}
              post={post}
              view="grid"
              refreshPosts={fetchMyPosts}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Myposts;
