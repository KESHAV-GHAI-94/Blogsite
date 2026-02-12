const express= require("express");
const HomeRouter = express.Router();
const auth = require("../middlewares/auth");
const {Viewposts,detailedpost} = require("../controllers/Postcontroller/postcontrol");


module.exports = HomeRouter;