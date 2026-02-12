const express = require("express");
const multer = require("multer");
const PostRouter = express.Router();
const auth = require("../middlewares/auth");
const {Postcreated,Viewposts,detailedpost} = require("../controllers/Postcontroller/postcontrol");
const {likePost,unlikePost}= require("../controllers/Postcontroller/like-dislike")
const {getCommentsByPost,addComment,addReply,deletecomment} = require("../controllers/Postcontroller/comments")

const upload = multer({
    storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

PostRouter.get("/",Viewposts);
//api for opening post page 

PostRouter.get("/post/:id",detailedpost);

//API FOR likes/dislikes
PostRouter.post("/:id/like",auth,likePost);
PostRouter.post("/:id/unlike",auth,unlikePost);

//reading comments // not used 
PostRouter.get("/:id/comments",getCommentsByPost);
//adding comments:
PostRouter.post("/:id/comment",auth, addComment);
//adding reply
PostRouter.post("/:id/comment/:commentId/reply",auth,addReply);
//delete post 
PostRouter.post("/:id/comment/:commentId/delete",auth,deletecomment);
//api use to open createposts
PostRouter.get("/create-post", auth,async(req,res)=>{
    res.json({
    message: "Open Create Post Page",
    });
})

PostRouter.post("/create-post",auth,upload.single("image"),Postcreated);
module.exports = PostRouter;