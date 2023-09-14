const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// routes
const blogsRouter = require("./api/routes/blog");
const uploadRoutes = require("./api/routes/upload");
const userRoutes = require("./api/routes/user");
const pageRoutes = require("./api/routes/pages");

// connnect mongoose
mongoose
  .connect(
    "mongodb+srv://buzz:QERzYDgM85byxjX8@cluster0.pjq7ibn.mongodb.net/buzztag"
  )
  .then(() => {
    console.log("Connect Mongo atlas successfuly");
  })
  .catch(() => {
    console.log("Not Connect Mongo atlas");
  });

// morgan middleware
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Corrected header name
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


// handle reqest
app.use("/blog", blogsRouter);
app.use("/upload", uploadRoutes);
app.use("/user", userRoutes);
app.use("/pages", pageRoutes);

// error handling

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
