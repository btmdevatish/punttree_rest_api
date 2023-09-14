const express = require("express");

const router = express.Router();

const User = require("../controller/user.model");
const checkauth = require("../token-check/check-auth");

// sign up
router.post("/signup", User.signUpUser);

// login user
router.post("/login", User.loginUser);

//Delete user
router.delete("/signup/:userId", checkauth, User.deleteUser);

//
router.put("/pardelete/:userId", checkauth, User.partialDelete);

//get users data
router.get("/", checkauth, User.getUser);

router.delete("/:userId", checkauth, User.DeleteUser);

module.exports = router;
