const pool = require("../../config/db");
//likes add
const likePost = async (req, res) => {
    try {
    const user_id = req.user.id;
    const post_id = req.params.id;
    const query = `
    INSERT INTO likes (user_id, post_id)
    VALUES ($1, $2)
    RETURNING *;
    `;
    const result = await pool.query(query, [user_id, post_id]);
    res.status(201).json({
    message: "Post liked",
    like: result.rows[0]
    });
    } catch (err) {
    // handles duplicate like automatically
    if (err.code === "23505") {
        return res.status(400).json({ message: "You already liked this post" });
    }
    res.status(500).json({ error: err.message });
    }
    };
    //unliked post
    const unlikePost = async (req, res) => {
    try {
    const user_id = req.user.id;
    const post_id = req.params.id;

    const query = `
        DELETE FROM likes
        WHERE user_id = $1 AND post_id = $2
        RETURNING *;
    `;
    const result = await pool.query(query, [user_id, post_id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "Like not found" });
    }
    res.json({ message: "Post unliked" });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};
module.exports = {
    likePost,
    unlikePost
}