const express= require("express");
const LoginRouter = express.Router();
const { loginuser } = require("../controllers/Authentication/loginuser");
const {forgetpassword,verifyotp,resetPassword} = require("../controllers/Authentication/forgetpassword")
require("dotenv").config();

LoginRouter.get("/", (req,res)=>{
    res.send("LOGIN here  back!");
    // this api is for fecthing login page from uppper header and redirects to loginpage
})
LoginRouter.post("/",loginuser)

// forget password api here
LoginRouter.get("/forget-password",(req,res)=>{
    res.send("hello forget password set krlo")
    // api for fetching forget password page
});
LoginRouter.post("/forget-password", forgetpassword);
LoginRouter.post("/verify-otp",verifyotp);
LoginRouter.post("/reset-password",resetPassword);
LoginRouter.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.send("Logged out successfully");
});

module.exports = LoginRouter;