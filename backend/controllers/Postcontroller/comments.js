const pool = require("../../config/db");
//fetching comments main comments only where parent comid is null
const getCommentsByPost = async (req, res) => {
    const { id } = req.params; //post id
    const result = await pool.query(`
    SELECT c1.id AS comment_id,c1.comment AS main_comment,c2.id AS reply_id,c2.comment AS reply_text FROM comments c1 LEFT JOIN comments c2 ON c2.parent_comment_id = c1.id WHERE c1.post_id = $1 AND c1.parent_comment_id IS NULL;`, [id]);
    res.json(result.rows);
    };
    
    //getCommentsreplybypost replys of the comment;
const getCommentsreplyByPost = async (req, res) => {
    try{
    const { id,commentId} = req.params;
    console.log(commentId);
    const result = await pool.query(`
    SELECT c1.id AS comment_id,c1.comment AS main_comment,c2.id AS reply_id,c2.comment AS reply_text FROM comments c1 LEFT JOIN comments c2 ON c2.parent_comment_id = c1.id WHERE c1.post_id = $1 AND c1.id=$2;`, [id,commentId]);
    if (result.rows.length === 0) {
        return res.status(404).json({ message: " no replies" });
    }
    res.json(result.rows);  
    }
    catch (err) {
    res.status(500).json({ error: err.message });
    }
};
// add comment
const addComment = async (req,res)=>{
    const { id } = req.params;      //this will check post id 
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
    getCommentsreplyByPost
}