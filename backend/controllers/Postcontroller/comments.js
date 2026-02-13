const pool = require("../../config/db");
//fetching comments main comments only where parent comid is null
const getCommentsByPost = async (req, res) => {
    try{
    const { id } = req.params; //post id
    //first check the post 
    const postCheck = await pool.query("SELECT id FROM posts WHERE id = $1",[id]);
    if (postCheck.rows.length === 0) {
    return res.status(404).json({ message: "Post not found" });
    }
    const result = await pool.query(`
    SELECT c.id, c.comment,
    c.user_id, c.created_at,
    u.name FROM comments c
    JOIN users u ON
    u.id = c.user_id 
    WHERE c.post_id = $1 
    AND c.parent_comment_id 
    IS NULL ORDER BY
    c.created_at DESC;`
    ,[id]);
    if (result.rows.length === 0) {
        return res.status(200).json({ message: " no comments" });
    }
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};
// add comment
const addComment = async (req,res)=>{
    const { id } = req.params;
    // console.log(id);
    const user_id = req.user.id; 
    // console.log(user_id);
    const {comment} = req.body;
    await pool.query(
        `INSERT INTO comments (user_id, post_id, comment)
        VALUES ($1, $2, $3)`,
        [user_id, id, comment]
    );
    res.status(201).send("Comment added");
    };
// reply adding 
const addReply = async (req, res) => {
    const { id,commentId } = req.params;
    const user_id= req.user.id;
    // console.log(user_id);
    const {comment} = req.body;
    await pool.query(`INSERT INTO comments (user_id,post_id,parent_comment_id, comment) VALUES ($1, $2, $3, $4)`,[user_id, id, commentId, comment]);
    res.status(201).send("reply sended");
};
const deletecomment = async(req,res)=>{
    try{
        const userId = req.user.id;
        console.log(userId);
    const {commentId} = req.params;
    console.log(commentId, "id comment deleted. "); //
    const result =await pool.query(`DELETE FROM comments WHERE id=$1 and user_id= $2 RETURNING *;`,[commentId,userId]);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: " Comment not found" });
    }
    res.json({ message: "Comment DELETED" });
    }
    catch (err) {
    res.status(500).json({ error: err.message });
    }
} ;

module.exports = {
    getCommentsByPost,
    addComment,
    addReply,
    deletecomment,
}