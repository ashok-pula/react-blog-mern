import React, { useContext, useState } from "react";
import "./settings.css";
import Sidebar from "./../../components/sidebar/Sidebar";
import { Context } from "../../context/context";
import axios from "axios";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const updateHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    try {
      const updatedUser = { userId: user._id, username, email, password };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;
        try {
          const res = await axios.post("/api/upload", data);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      const res = await axios.put("/api/users/" + user._id, updatedUser);
      console.log(res.data);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess(true);
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  const deleteHanlder = async () => {
    try {
      const res = await axios.delete("/api/users/" + user._id, {
        data: { userId: user._id },
      });
      console.log(res.data);
      dispatch({ type: "DELETE_ACCOUNT" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={deleteHanlder}>
            Delete Account
          </span>
        </div>
        <form className="settingsForm">
          <label htmlFor="">Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt="profile image"
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              className="settingsPPInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            name="name"
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="settingsSubmitButton"
            type="submit"
            onClick={updateHandler}
          >
            Update
          </button>
          {success && (
            <span style={{ color: "green", textAlign: "center" }}>
              Updated succussfully
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
