import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import "./home.css";
import Posts from "./../../components/posts/Posts";
import Sidebar from "./../../components/sidebar/Sidebar";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  // console.log(search);
  // const params = useParams();
  // console.log(params);
  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get("/api/posts" + search);
      setPosts(res.data);
    };
    getPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
