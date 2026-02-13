const pool = require("../config/db");
const createPost = async (user_id, title, description, image_url) => {
    // creating posts
  const query = `
    INSERT INTO posts (user_id, title, description, image_url)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
  `;
  return pool.query(query, [user_id, title, description, image_url]);
};

//fetchhing all the post data

const getAllPosts = async () => {
  const query = `
    SELECT 
      posts.id,
      posts.title,
      posts.description,
      ENCODE(posts.image_url,'base64') AS image_base64,
      posts.share_count,
      posts.created_at,
      users.name AS author_name
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC;
  `;
  return pool.query(query);
};

const getPostsByUser = async (user_id) => {
  const query = `
    SELECT 
      id, title, description,
      ENCODE(image_url,'base64') AS image_base64,
      share_count, created_at
    FROM posts 
    WHERE user_id=$1 
    ORDER BY created_at DESC;
  `;
  return pool.query(query, [user_id]);
};
// update posts 
const updatePost = async (id, title, description, image_url) => {
  const query = `
    UPDATE posts 
    SET title=$1, description=$2, image_url = COALESCE($3, image_url)
    WHERE id=$4
    RETURNING *;
  `;
  return pool.query(query, [title, description, image_url, id]);
};
// delete posts api 
const deletePost = async (id) => {
  return pool.query("DELETE FROM posts WHERE id=$1 RETURNING *", [id]);
};
const getRawPostsByUser = async (user_id) => {
  return pool.query(
    "SELECT id FROM posts WHERE user_id=$1",
    [user_id]
  );
};
    module.exports = {
    createPost,
    getAllPosts,
    getPostsByUser,
    updatePost,
    deletePost,
    getRawPostsByUser
};