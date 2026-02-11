const express= require("express");
const HomeRouter = express.Router();
const auth = require("../middlewares/auth");
const {Viewposts,detailedpost} = require("../controllers/Postcontroller/postcontrol");
const {likePost,unlikePost}= require("../controllers/Postcontroller/like-dislike")
const {getCommentsByPost,addComment,addReply,deletecomment,getCommentsreplyByPost} = require("../controllers/Postcontroller/comments")
//api which displays all posts public

HomeRouter.get("/",Viewposts);

//api for opening post page 

HomeRouter.get("/post/:id",detailedpost);

//API FOR likes/dislikes
HomeRouter.post("/post/:id/like",auth,likePost);
HomeRouter.post("/post/:id/unlike",auth,unlikePost);

//reading comments 
HomeRouter.get("/post/:id/comments",getCommentsByPost);
//adding comments:
HomeRouter.post("/post/:id/comment",auth, addComment);
//adding reply
HomeRouter.post("/post/:id/comment/:commentId/reply",auth,addReply);
//delete post 
HomeRouter.post("/post/:id/comment/:commentId/delete",auth,deletecomment);
module.exports = HomeRouter;