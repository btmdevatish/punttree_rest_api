const express = require("express");

const router = express.Router();

const Blog = require("../controller/blog.model");
const checkauth = require("../token-check/check-auth");

// const Blog = require("../models/blog");
const { default: mongoose } = require("mongoose");
// GET all blogs
router.get("/", Blog.getAllBlogs);

//POST All blogs
router.post("/",checkauth, Blog.postBlog);

// GET for the single blog
router.get("/:blogId", Blog.getBlogById);


router.delete("/:blogId", checkauth, Blog.deleteBlog)

router.put("/:blogID",checkauth, Blog.updateBlog)
//UPDATE single blog
// router.patch("/:blogID", (req, res, next) => {
//   const id = res.body.params.blogId;
//   res.status(200).json({
//     msg: "This is a UPDATE request for blog",
//   });
// });


module.exports = router;
