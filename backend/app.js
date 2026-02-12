const express= require("express");
const cors = require("cors");
const pool = require("./config/db");
const app = express();
require("dotenv").config();
require("./utils/userverify");
require("./utils/forgetemail");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
}));
app.use(express.urlencoded({extended:true}));
const IndexRouter = require("./routers/IndexRouter");
const SignupRouter = require("./routers/SignupRouter");
const LoginRouter = require("./routers/LoginRouter");
const HomeRouter = require("./routers/HomeRouter");
const AccountRouter = require("./routers/AccountRouter");
const PostRouter = require("./routers/PostRouter")
app.use("/",IndexRouter);
app.use("/sign-up",SignupRouter);
app.use("/login",LoginRouter);
app.use("/Home",HomeRouter);
app.use("/post",PostRouter);
app.use("/account",AccountRouter);
app.listen(3000,()=>{
    console.log(`your port is running on ${process.env.PORT}`)
})