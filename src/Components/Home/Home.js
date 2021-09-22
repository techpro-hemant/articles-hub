/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React from "react";
import "./Home.scss";
import ArticleList from "../ArticleList/ArticleList";
import Sidebar from "../Sidebar/Sidebar";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import M from "materialize-css";
import AddArticlePopUp from "../AddArticlePopUp/AddArticlePopUp";

function Home() {
  let userDetails = useSelector((state) => state.userDetails.profile);

  document.addEventListener("DOMContentLoaded", function () {
    var elem = document.getElementById("add-article");
    M.Modal.init(elem);
  });

  const openAddArticlePop = () => {
    var instance = M.Modal.getInstance(document.getElementById("add-article"));
    instance.open();
  };

  return (
    <div className="row home m-20">
      <div className="col s7 offset-s1 feed-section">
        {userDetails && (
          <React.Fragment>
            <Route
              exact
              path="/home/"
              render={(props) => (
                <ArticleList
                  key={props.location.key}
                  {...props}
                  url="/articles"
                />
              )}
            />
            <Route
              exact
              path="/home/myarticles"
              render={(props) => (
                <ArticleList
                  key={props.location.key}
                  {...props}
                  url={`/articles?author=${userDetails.username}`}
                />
              )}
            />
            <Route
              exact
              path="/home/favourites"
              render={(props) => {
                return (
                  <ArticleList
                    key={props.location.key}
                    {...props}
                    url={`/articles?favorited=${userDetails.username}`}
                  />
                );
              }}
            />
            <Route
              exact
              path="/home/articles/tags/:tagName"
              render={(props) => {
                return (
                  <ArticleList
                    key={props.match.params.tagName}
                    {...props}
                    url={`/articles?tag=${props.match.params.tagName}`}
                  />
                );
              }}
            />
          </React.Fragment>
        )}
      </div>
      <div className=" col content-section mt-50 ml-50">
        <Sidebar />
      </div>
      <a
        className="add-button btn-floating btn-large waves-effect waves-light red"
        href="javascript:void(0);"
        onClick={() => {
          openAddArticlePop();
        }}
      >
        <i className="fa fa-plus" aria-hidden="true"></i>
      </a>
      <AddArticlePopUp />
    </div>
  );
}

export default Home;
