const pool = require("../../config/db");
const {
  createPost,
  getAllPosts,
  getPostsByUser,
  updatePost,
  deletePost,
  getRawPostsByUser,
} = require("../../models/postModel");

//api for creting post
const Postcreated = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image_url = null;
    if (req.file) {
      image_url = req.file.buffer;
    }
    const user_id = req.user.id;
    const result = await createPost(user_id, title, description, image_url);
    res.status(201).json({
      message: "Post created successfully",
      post: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//api which displays all posts public
const Viewposts = async (req, res) => {
  try {
    const result = await getAllPosts();
    const posts = result.rows.map((post) => {
      let imageUrl = null;
      if (post.image_base64 && post.image_base64 !== null) {
        imageUrl = `data:image/jpeg;base64,${post.image_base64}`;
      }
      return {
        ...post,
        image_url: imageUrl,
      };
    });
    res.json({
      message: "Welcome to Home Page",
      posts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//pagination
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;
    const postsQuery = `
    SELECT 
        posts.id,
        posts.title,
        posts.description,
        ENCODE(posts.image_url, 'base64') AS image_base64,
        posts.created_at,
        posts.user_id
    FROM posts
    ORDER BY posts.created_at DESC
    LIMIT $1 OFFSET $2
    `;
    const postsResult = await pool.query(postsQuery, [limit, offset]);
    const posts = postsResult.rows.map((post) => {
      let imageUrl = null;
      if (post.image_base64) {
        imageUrl = `data:image/jpeg;base64,${post.image_base64}`;
      }
      return {
        ...post,
        image_url: imageUrl,
      };
    });
    const countResult = await pool.query(`SELECT COUNT(*) FROM posts`);
    const totalPosts = parseInt(countResult.rows[0].count);
    res.json({
      posts: posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
//api for opening post page
const detailedpost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id || null;
    const postquery = `
        SELECT posts.id,
        posts.title,
        posts.description,
        ENCODE(posts.image_url, 'base64') AS image_base64,
        posts.share_count,
        posts.created_at, 
        users.name AS author_name,
        COUNT(likes.id) AS like_count
        FROM posts
        JOIN users ON posts.user_id = users.id
        LEFT JOIN likes ON likes.post_id = posts.id
        WHERE posts.id = $1
        GROUP BY posts.id, users.name;
        `;
    const postresult = await pool.query(postquery, [postId]);
    if (postresult.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    const post = postresult.rows[0];
    let isLiked = false;
    if (userId) {
      const likeCheck = await pool.query(
        "SELECT 1 FROM likes WHERE user_id = $1 AND post_id = $2",
        [userId, postId],
      );
      isLiked = likeCheck.rows.length > 0;
    }
    const commentsQuery = `
        SELECT 
            c.id,
            c.comment,
            c.created_at,
            c.parent_comment_id,
            c.user_id,
            u.name AS commenter_name
        FROM comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.post_id = $1
        ORDER BY c.created_at ASC;
        `;
    const commentsResult = await pool.query(commentsQuery, [postId]);
    const allComments = commentsResult.rows;
    //build nested structure
    const commentMap = {};
    const nestedComments = [];
    allComments.forEach((c) => {
      commentMap[c.id] = { ...c, replies: [] };
    });
    allComments.forEach((c) => {
      if (c.parent_comment_id) {
        commentMap[c.parent_comment_id]?.replies.push(commentMap[c.id]);
      } else {
        nestedComments.push(commentMap[c.id]);
      }
    });
    res.json({
      post: {
        ...post,
        like_count: Number(post.like_count),
        isLiked,
      },
      comments: nestedComments,
      currentUserId: userId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// API FOR GETING DATA OF USERS OWNED POST
const UserOwnpost = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await getPostsByUser(userId);
    res.json({
      message: "Your Posts",
      posts: result.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//UPDATE POSTS
const Updatepost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    let image_url = null;
    if (req.file) {
      image_url = req.file.buffer;
    }
    const check = await getRawPostsByUser(req.user.id);
    const isOwner = check.rows.some((post) => post.id === Number(id));
    if (!isOwner) {
      return res.status(403).json({ message: "Not your post" });
    }
    const result = await updatePost(id, title, description, image_url);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({
      message: "Post updated successfully",
      post: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// DELETE POSTS
const Deletepost = async (req, res) => {
  try {
    const id = req.params.id;
    const check = await getRawPostsByUser(req.user.id);
    const isOwner = check.rows.some((post) => post.id === Number(id));
    if (!isOwner) {
      return res.status(403).json({ message: "Not your post" });
    }
    const result = await deletePost(id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const UserOwnpostById = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await getRawPostsByUser(req.user.id);
    const isOwner = check.rows.some((post) => post.id === Number(id));
    if (!isOwner) {
      return res.status(403).json({ message: "Not your post" });
    }
    const result = await pool.query(
      `SELECT 
            id, title, description,
            ENCODE(image_url, 'base64') AS image_base64,
            share_count, created_at
        FROM posts WHERE id=$1`,
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({
      message: "Post found",
      post: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  Postcreated,
  Viewposts,
  detailedpost,
  UserOwnpost,
  Updatepost,
  Deletepost,
  UserOwnpostById,
  getPosts,
};
