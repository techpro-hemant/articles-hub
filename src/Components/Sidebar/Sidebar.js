/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import "./Sidebar.scss";
import axios from "../../axios";

function Sidebar(props) {
  let [tagsData, setTagsData] = useState([]);

  useEffect(() => {
    axios
      .get("/tags")
      .then((response) => {
        setTagsData(response.data.tags);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <div className="sidebar">
        <ul>
          {/* <li>
            <i className="fa fa-user mr-10" aria-hidden="true"></i>
            <a href="javascript:void(0);">My Profile</a>
          </li> */}
          <li>
            <i className="fa fa-home mr-10" aria-hidden="true"></i>
            <Link to="/home/">Home</Link>
          </li>
          <li>
            <i className="fa fa-sticky-note mr-10" aria-hidden="true"></i>
            <Link to="/home/myarticles">My Articles</Link>
          </li>
          <li>
            <i className="fa fa-heart mr-10" aria-hidden="true"></i>
            <Link to="/home/favourites">My Favourites</Link>
          </li>
        </ul>
      </div>
      <div className="tags mt-50">
        <div className="center-align tag-heading mb-30">Search By Tags</div>
        <div className="tags-list">
          {tagsData
            .filter((tag) => {
              tag = tag.replace(/\u200C/g, "");
              return tag;
            })
            .map((tag, index) => {
              return (
                <div
                  className="chip"
                  key={index}
                  onClick={() => {
                    props.history.push(`/home/articles/tags/${tag}`);
                  }}
                >
                  <span className="tag-icon">
                    <i className="fa fa-hashtag" aria-hidden="true"></i>
                  </span>
                  <span className="tag-name">{tag}</span>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(Sidebar);
