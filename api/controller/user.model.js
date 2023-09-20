const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signUp
exports.signUpUser = async (req, res, next) => {
  try {
    const chekUser = await User.find({ email: req.body.email });

    if (chekUser.length == 0) {
      bcrypt.hash(req.body.password, 10, (errs, hash) => {
        if (errs) {
          res.status(500).json({
            error: errs,
          });
        } else {
          const UserMain = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            full_name: req.body.full_name,
            phone: req.body.phone,
            is_active: req.body.is_active,
            isDeletedPartial: req.body.isDeletedPartial,
            admin_email: req.body.admin_email,
            role: req.body.role,
          });
          const userData = UserMain.save();
          res.status(200).json({
            code: 1,
            message: "User created successfuly",
          });
        }
      });
    } else {
      res.status(401).json({
        message: "Email alredy exist",
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

// delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.userId });
    res.status(200).json({
      code: 1,
      message: "Delete user successfully",
    });
  } catch {}
};

// update user
exports.partialDelete = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body);
    res.status(200).json({
      code: 1,
      message: "Delete request send successfully",
      data: user,
    });
  } catch (err) {
    res.status(401).json({
      code: 0,
      message: "somthing went wrong",
    });
  }
};

// get All users
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find({ },{ password: 0, admin_email: 0 });
     if (user != null) {
      res.status(200).json({
        code:1,
        data: user,
      });
    } else {
      res.status(404).json({
        message: "No record found",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong",
    });
  }
};

// delete user
exports.DeleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (user != null) {
      res.status(200).json({
        code: 1,
        message: "Delete successfuly",
        data: user,
        id: req.params.userId,
      });
    } else {
      res.status(200).json({
        code: 0,
        message: "This entry is not present",
        data: user,
        id: req.params.blogId,
      });
    }
  } catch {
    res.status(500).json({
      code: 0,
      message: "Something went wrong",
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user != null) {
      // compare password
      bcrypt.compare(
        req.body.password,
        user[0].password,
        function (err, result) {
          if (err) {
            res.status(401).json({
              message: "Auth failed",
              error: err,
            });
          }
          if (result) {
           const token = jwt.sign({
              email: user[0].email,
              id: user[0]._id,
            },
            process.env.JWT_AUTH_KEY,
            {
              expiresIn: "1h"
            });

            res.status(200).json({
              message: "Auth successfully",
              token: token
            });
          } else {
            res.status(404).json({
              message: "Password wrong",
            });
          }
        }
      );
    }else{
      res.status(301).json({
      code: 0,
      message: "User not found",
    });
    }
  } catch {
    res.status(500).json({
      code: 0,
      message: "User not exits",
    });
  }
};
