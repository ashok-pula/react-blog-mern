import React from "react";

import "./singlePost.css";
const SinglePost = () => {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt="single post image"
          className="singlePostImg"
        />
        <h1 className="singlePostTitle">
          Lorem ipsum dolor
          <div className="singlePostEdit">
            <i className="singlePostIcon fa-solid fa-pen-to-square"></i>
            <i className="singlePostIcon fa-solid fa-trash"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author: <b className="singlePostAuthor">Ashok</b>
          </span>
          <span>1 day ago</span>
        </div>
        <p className="singlePostDesc">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est odit ad
          nostrum nam nulla iusto dolores veritatis hic eum optio maiores, totam
          facere id perferendis itaque voluptate suscipit a perspiciatis. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Provident velit
          odit in sapiente ad architecto aliquam consequuntur, id quidem!
          Facilis blanditiis adipisci dolores, quisquam delectus asperiores
          deleniti et fugit culpa! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Fuga, ex placeat. Ad ipsam nobis atque velit earum
          accusamus quam? Expedita omnis saepe quae, perferendis facere iusto
          est eaque deserunt minima.
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est odit ad
          nostrum nam nulla iusto dolores veritatis hic eum optio maiores, totam
          facere id perferendis itaque voluptate suscipit a perspiciatis. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Provident velit
          odit in sapiente ad architecto aliquam consequuntur, id quidem!
          Facilis blanditiis adipisci dolores, quisquam delectus asperiores
          deleniti et fugit culpa! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Fuga, ex placeat. Ad ipsam nobis atque velit earum
          accusamus quam? Expedita omnis saepe quae, perferendis facere iusto
          est eaque deserunt minima.
        </p>
      </div>
    </div>
  );
};

export default SinglePost;
