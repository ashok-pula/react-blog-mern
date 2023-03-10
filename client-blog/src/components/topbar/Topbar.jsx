import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import "./topbar.css";

const Topbar = () => {
  const { user, dispatch } = useContext(Context);

  // const pic = user?.profilePic || "/person/4.jpeg";

  const PF = "http://localhost:5000/images/";

  const clickHanlder = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topbarLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topbarCenter">
        <ul className="topList">
          <li className="toplistItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="toplistItem">ABOUT</li>
          <li className="toplistItem">CONTACT</li>
          <li className="toplistItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && (
            <li className="toplistItem" onClick={clickHanlder}>
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topbarRight">
        {user ? (
          <Link to="/settings" className="link">
            <img src={PF + user.profilePic} alt="image" className="topImg" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="toplistItem">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="toplistItem">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
        <i className="topsearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default Topbar;
