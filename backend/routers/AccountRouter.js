const express = require("express");
const multer = require("multer");
const AccountRouter = express.Router();
const auth = require("../middlewares/auth");
const {UserOwnpost,Updatepost,Deletepost,UserOwnpostById} = require("../controllers/Postcontroller/postcontrol")
const upload = multer({
    storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});
// accessing account page
AccountRouter.get("/", auth, (req, res) => {
    res.json({
    message: "Account Page",
    user: req.user
    });
})
// API FOR GETING DATA OF USERS OWNED POST
AccountRouter.get("/my-posts", auth,UserOwnpost);

//UPDATE POSTS get
AccountRouter.get("/my-posts/update/:id", auth, UserOwnpostById);
//UPDATE POSTS post
AccountRouter.post("/my-posts/update/:id", auth,upload.single("image"), Updatepost);
// DELETE POSTS get
AccountRouter.get("/my-posts/delete/:id", auth,UserOwnpostById);
// DELETE POSTS post
AccountRouter.post("/my-posts/delete/:id", auth,Deletepost);
module.exports = AccountRouter;