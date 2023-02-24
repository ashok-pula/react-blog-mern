const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const authRouter = require("./routes/auth.js");
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts");
const categoriesRouter = require("./routes/categories.js");

const app = express();

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI, () =>
  console.log("mongoose conncected")
);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/categories", categoriesRouter);
app.listen(5000, () => console.log("server is running"));
