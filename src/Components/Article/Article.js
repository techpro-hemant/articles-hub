/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Article.scss";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import { setArticle } from "../Action/Action";
import axios from "../../axios";

function Article({ article, isArticleFavourite, index, deleteArticle }) {
  let [isFavourite, setIsFavourite] = useState(false);
  let userDetails = useSelector((state) => state.userDetails.profile);

  const dispatch = useDispatch();
  useEffect(() => {
    M.AutoInit();
    setIsFavourite(isArticleFavourite);
  }, [isArticleFavourite]);

  const formatDescription = (description) => {
    if (description.length > 300) {
      return `${description.substring(0, 300)}...`;
    }
    return description;
  };

  const favouriteArticle = () => {
    axios
      .post(`/articles/${article.slug}/favorite`)
      .then((response) => {
        setIsFavourite(true);
      })
      .catch((err) => console.log(err));
  };

  const unFavouriteArticle = () => {
    axios
      .delete(`/articles/${article.slug}/favorite`)
      .then((response) => {
        setIsFavourite(false);
      })
      .catch((err) => console.log(err));
  };

  const openCommentSection = (article) => {
    dispatch(setArticle(article));
    var instance = M.Modal.getInstance(
      document.getElementById("comment-section")
    );
    instance.open();
  };

  return (
    <div className="article-item" key={index}>
      <div className="article-item-info valign-wrapper mb-10">
        <img src={article.author.image} alt="" />
        <span className="ml-10">{article.author.username}</span>
      </div>
      <div className="article-item-heading">{article.title}</div>
      <div className="article-item-content mb-20">
        {formatDescription(article.description)}
        {article.description.length > 300 && (
          <a
            className="ml-10"
            href="javascript:void(0);"
            onClick={() => openCommentSection(article)}
          >
            see more
          </a>
        )}
      </div>
      <div className="article-item-control mb-20">
        <i
          className={
            isFavourite ? "fa fa-heart favorite-color" : "fa fa-heart-o"
          }
          aria-hidden="true"
          onClick={() => {
            if (!isFavourite) favouriteArticle();
            else unFavouriteArticle();
          }}
        ></i>
        <i
          className="fa fa-comment-o"
          aria-hidden="true"
          onClick={() => openCommentSection(article)}
        ></i>
      </div>
      <div className="article-item-tags mb-20">
        {article.tagList.map((tag, index) => {
          return (
            <span className="tags" key={index}>
              <i className="fa fa-hashtag" aria-hidden="true"></i>
              {tag}
            </span>
          );
        })}
      </div>
      <div className="article-item-timestamp">
        {moment(article.updatedAt).fromNow()}
        {userDetails &&
          userDetails.username &&
          article.author.username === userDetails.username && (
            <React.Fragment>
              <span
                className="ml-20"
                onClick={() => {
                  deleteArticle(article.slug);
                }}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
              </span>
              <span onClick={() => {}}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </span>
            </React.Fragment>
          )}
      </div>
    </div>
  );
}

export default Article;
