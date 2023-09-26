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
      message: "Update successfully",
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
    const user = await User.find({ role: { $ne: 'super_admin' } },{ password: 0, admin_email: 0 });
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

//logn user
exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    console.log(user)
    if (user != null && (user[0].is_active == true )) {
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
              code:1,
              message: "Auth successfully",
              token: token,
              name:user[0].full_name,
              role:user[0].role,
              email:user[0].email
            });
          } else {
            res.status(404).json({
              message: "Password wrong",
            });
          }
        }
      );
    }else{
      res.status(200).json({
        code: 0,
        message: "User not active",
      });
    }
  } catch {
    res.status(500).json({
      code: 0,
      message: "User not exits",
    });
  }
};



//reset pssword
exports.resetUserPass = async (req, res, next) => {
  try {
    const newPassword = req.body.password; // Assuming you receive the new password in the request body

    // Hash the new password
    bcrypt.hash(newPassword, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }

      try {
        // Find the user by ID and update the password field
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          { password: hash },
          { new: true } // To return the updated user document
        );

        if (!updatedUser) {
          return res.status(404).json({
            code: 0,
            message: "User not found",
          });
        }

        res.status(200).json({
          code: 1,
          message: "Password Updated",
        });
      } catch (updateErr) {
        res.status(500).json({
          code: 0,
          message: "Something went wrong",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      code: 0,
      message: "Bad Request",
    });
  }
};
