const mongoose = require("mongoose");
const Blog = require("../models/blog");

// GET All blogs
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    if (blogs.length > 0) {
      res.status(200).json({
        data: blogs,
      });
    } else {
      res.status(404).json({
        message: "No record found",
      });
    }
  } catch (err) {
    res.status(200).json({
      code: 0,
      message: "Something went wrong",
      error: err,
    });
  }
};

// GET Single bloog by ID
exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (blog != null) {
      res.status(200).json({
        code: 1,
        message: "Successful",
        data: blog,
      });
    } else {
      res.status(200).json({
        code: 0,
        message: "No record found",
        data: blog,
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong",
      error: err,
    });
  }
};

//POST Blog
exports.postBlog = async (req, res, next) => {
  try {
    const blogData = new Blog({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      slug: req.body.slug,
      featured_img: req.body.featured_img,
      short_desc: req.body.short_desc,
      desc: req.body.desc,
    });

    const blog = await blogData.save();
    res.status(200).json({
      code: 1,
      message: "Created successfuly",
      data: blog,
    });
  } catch {
    res.status(500).json({
      code: 0,
      message: "Somthing went wrong",
    });
  }
};

//DELETE blog

exports.deleteBlog = async (req,res,next) =>{
  try{
    const blog = await Blog.findByIdAndDelete(req.params.blogId)
    if(blog != null){
      res.status(200).json({
        code: 1,
        message: "Delete successfuly",
        data: blog,
        id: req.params.blogId
      })
    }else{
      res.status(200).json({
        code: 0,
        message: "This entry is not present",
        data: blog,
        id: req.params.blogId
      })
    }
    
  }
  catch{
    res.status(500).json({
      code: 0,
      message: "Something went wrong"
    })
  }
}

// update blog
exports.updateBlog = async (req,res,next) => {
  try{
    const blog = await Blog.findByIdAndUpdate(req.params.blogID , req.body)
    res.status(200).json({
      code: 1,
      message: "Update successfuly"
    })
  }
  catch{
    res.status(500).json({
      code: 0,
      message: "Something went wrong"
    })
  }
}
