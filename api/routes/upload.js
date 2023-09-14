const express = require("express");
const router = express.Router();

const multer = require("multer");
const checkauth = require("../token-check/check-auth");
const Media = require("../controller/media.model");


// const upload = multer({ dest: 'uploads/' });

const uploads = multer({
  storage: multer.diskStorage({
    // destination: function (req, res, cb) {
    //   cb(null, "uploads");
    // },
    // filename: function (req, file, cb) {
    //   const uniqueSuffix =
    //     Date.now() + "-" + Math.round(Math.random() * 1e9);
    //   cb(
    //     null,
    //     file.fieldname + "-" + uniqueSuffix + "-" + file.originalname
    //   );
    // },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only JPEG or PNG files are allowed."), false); // Reject the file
    }
  },
  limits: { fileSize: 102400 },
}).single("img_upload");

//POST All blogs
router.post("/",checkauth, uploads, Media.postMedia);
router.get("/",checkauth, Media.getMedia);
router.delete("/:mediaId",checkauth, Media.deleteMedia);

module.exports = router;
