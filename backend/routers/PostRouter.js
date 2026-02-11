const express = require("express");
const PostRouter = express.Router();
const auth = require("../middlewares/auth");
const {Postcreated} = require("../controllers/Postcontroller/postcontrol");
//api use to open createposts

PostRouter.get("/create-post", auth,async(req,res)=>{
    res.json({
    message: "Open Create Post Page",
    });
})

PostRouter.post("/create-post",auth,Postcreated);
module.exports = PostRouter;