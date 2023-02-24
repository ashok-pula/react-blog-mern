import React, { useContext, useState } from "react";
import "./write.css";
import { Context } from "./../../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newPost = { username: user?.username, title, desc };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          const res = await axios.post("/api/upload", data);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      const post = await axios.post("/api/posts/", newPost);
      console.log(post.data);
      navigate(`/posts/${post.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="write">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="write image"
          className="writeImg"
        />
      )}
      <form className="writeForm" onSubmit={submitHandler}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            className="writeInput"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story ..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
