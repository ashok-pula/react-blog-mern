import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/context";

import "./singlePost.css";
const SinglePost = () => {
  const [post, setPost] = useState({});

  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const pic = "16771304320125.jpeg";
  const pic1 = post.photo ? PF + post.photo : PF + pic;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatemode, setUpdatemode] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // const params = useParams();
  // console.log(params.id);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path, updatemode]);
  const deletHandler = async () => {
    try {
      const res = await axios.delete(`/api/posts/${post._id}`, {
        data: {
          username: user.username,
        },
      });
      console.log(res.data);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const updateHanlder = async () => {
    try {
      const res = await axios.put(`/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      // console.log(res.data);
      setUpdatemode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img src={pic1} alt="single post image" className="singlePostImg" />
        {updatemode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <h1 className="singlePostTitle">
            {post?.title}
            {user?.username === post.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-pen-to-square"
                  onClick={() => setUpdatemode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash"
                  onClick={deletHandler}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updatemode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}
      </div>
      {updatemode && (
        <button className="singlePostUpdateButton" onClick={updateHanlder}>
          Update
        </button>
      )}
    </div>
  );
};

export default SinglePost;
