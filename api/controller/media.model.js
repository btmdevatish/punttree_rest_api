const mongoose = require("mongoose");
const Media = require("../models/media");
const cloudinary = require("../helper/cloudinary");
// POST All blogs
exports.postMedia = async (req, res, next) => {
  //console.log(req.file);

  const uploaded = await cloudinary.uploader
    .upload(req.file.path, {
      public_id: "punttree",
      overwrite: true,
      faces: true,
    })
    .then((result) => {
      return result.secure_url;
    });
  try {
    const mediaData = new Media({
      _id: new mongoose.Types.ObjectId(),
      large_url: uploaded,
      small_url: uploaded,
      name: req.file.originalname,
      modified_date: new Date(),
      is_delete: req.body.is_delete,
    });
    const media = await mediaData.save();
    res.status(200).json({
      code: 1,
      message: "Upload successfully",
      path: uploaded,
    });
  } catch {
    res.status(500).json({
      code: 0,
      message: "Somthing went wrong",
    });
  }
};

//GET MEdia
exports.getMedia = async (req, res, next) => {
  try {
    const media = await Media.find();
    if (media != null) {
      res.status(200).json({
        code: 1,
        data: media,
      });
    } else {
      res.status(401).json({
        code: 0,
        message: "No entry found",
      });
    }
  } catch (err) {
    res.status(500).json({
      code: 0,
      message: "Somthing went wrong",
      error: err,
    });
  }
};

exports.deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.mediaId);
    if (media != null) {
      res.status(200).json({
        code: 1,
        message: "Delete successfuly",
        data: media,
        id: req.params.mediaId,
      });
    } else {
      res.status(200).json({
        code: 0,
        message: "This entry is not present",
        data: media,
        id: req.params.mediaId,
      });
    }
  } catch {}
};
