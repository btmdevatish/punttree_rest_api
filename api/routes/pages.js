const express = require("express");

const router = express.Router();

const Page = require("../controller/pages.model");
const checkauth = require("../token-check/check-auth");
// const Blog = require("../models/blog");
const { default: mongoose } = require("mongoose");

// GET all blogs
router.get("/", Page.getPage);

//POST All blogs
router.post("/",checkauth, Page.postPage);

// UPDATE pages
router.put("/:pageId",checkauth, Page.updatePages);


module.exports = router;