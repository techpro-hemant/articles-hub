/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ArticleList.scss";
import Article from "../Article/Article";
import CommentSection from "../CommentSection/CommentSection";
import { useSelector } from "react-redux";
import axios from "../../axios";
import setAuthorizationHeader from "../../utils";

function ArticleList(props) {
  let { url, location } = props;
  let [favouriteSlugs, setFavouriteSlugs] = useState([]);
  let [articleList, setArticleList] = useState([]);
  let headingName = "Feeds";
  let userDetails = useSelector((state) => state.userDetails.profile);

  if (location.pathname.indexOf("/home/myarticles") !== -1) {
    headingName = "My Articles";
  } else if (location.pathname.indexOf("/home/favourites") !== -1) {
    headingName = "My Favourites";
  } else if (location.pathname.indexOf("/home/articles/tags/") !== -1) {
    headingName = `Filtered by tag: #${props.match.params.tagName}`;
  } else {
    headingName = "Feeds";
  }

  useEffect(() => {
    getArticles();

    if (userDetails && userDetails.username) {
      getFavouriteArticles();
    }
  }, [userDetails]);

  const getArticles = () => {
    axios
      .get(url)
      .then((response) => {
        setAuthorizationHeader(localStorage.getItem("TOKEN"));
        setArticleList(response.data.articles);
      })
      .catch((err) => console.log(err));
  };

  const getFavouriteArticles = () => {
    let favData = [];
    axios
      .get(`articles?favorited=${userDetails.username}`)
      .then((response) => {
        for (let article of response.data.articles) {
          favData.push(article.slug);
        }
        setFavouriteSlugs(favData);
      })
      .catch((err) => console.log(err));
  };

  const deleteArticle = (slug) => {
    axios
      .delete(`/articles/${slug}`)
      .then((response) => {
        getArticles();
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="feed-heading mb-20">{headingName}</div>
      {articleList && articleList.length === 0 && (
        <div className="no-articles valign-wrapper">No Articles Available</div>
      )}
      {articleList && articleList.length > 0 && (
        <div className="articles">
          {articleList.map((article, index) => {
            return (
              <Article
                article={article}
                isArticleFavourite={favouriteSlugs.indexOf(article.slug) !== -1}
                index={index}
                deleteArticle={deleteArticle}
                key={index}
              />
            );
          })}
        </div>
      )}
      <CommentSection />
    </React.Fragment>
  );
}

export default ArticleList;
