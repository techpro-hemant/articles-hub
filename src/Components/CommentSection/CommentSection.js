/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useEffect, useState } from "react";
import "./CommentSection.scss";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "../../axios";

function CommentSection() {
  let article = useSelector((state) => state.selectedArticle);
  let userDetails = useSelector((state) => state.userDetails.profile);

  let [comments, setComments] = useState([]);
//   let [editComment, setEditComment] = useState(false);
  let commentRef = React.createRef("");

//   const textareaComment = React.createRef("");

  const loadComments = () => {
    axios
      .get(`/articles/${article.slug}/comments`)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (article.slug) {
      loadComments();
    }
  }, [article.slug]);

  const postComment = (body) => {
    let requestBody = {
      comment: {
        body,
      },
    };
    axios
      .post(`/articles/${article.slug}/comments`, requestBody)
      .then((response) => {
        loadComments();
        commentRef.current.value = "";
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (slug, id) => {
    axios
      .delete(`articles/${slug}/comments/${id}`)
      .then((response) => loadComments())
      .catch((err) => console.log(err));
  };

  return (
    <div id="comment-section" className="modal comment-section">
      <div className="modal-content">
        <div className="article-author valign-wrapper mb-10">
          <img
            src={article.author && article.author.image}
            alt=""
            className="mr-10"
          />
          {article.author && article.author.username}
        </div>
        <div className="article-title mb-10">{article.title}</div>
        <div className="article-description mb-10">{article.description}</div>
        <div className="article-tags mb-20">
          {article.tagList &&
            article.tagList.map((tag, index) => {
              return (
                <span className="tags" key={index}>
                  <i className="fa fa-hashtag" aria-hidden="true"></i>
                  {tag}
                </span>
              );
            })}
        </div>
        <div className="divider"></div>
        <div className="comment-label mt-10">Comments</div>
        <div className="comment-input row mb-10">
          <div className="input-field col s10">
            <textarea
              ref={commentRef}
              id="comment-area"
              className="materialize-textarea"
            ></textarea>
            <label htmlFor="comment-area">Enter your comment</label>
          </div>
          <div className="col s2 valign-wrapper">
            <a
              href="javascript:void(0)"
              onClick={() => postComment(commentRef.current.value)}
            >
              Post
            </a>
          </div>
        </div>
        <div className="comment-list">
          {comments.map((comment, index) => {
            return (
              <div className="comment-list-item" key={index}>
                <div className="comment-list-item-info">
                  <div className="avatar">
                    <img src={comment.author.image} alt="" />
                  </div>
                  <div className="comment-info mb-10">
                    <div className="username">{comment.author.username}</div>

                    <div className="comment">{comment.body}</div>

                    {/* {editComment && (
                      <div className="edit-comment-input input-field">
                        <textarea
                          ref={textareaComment}
                          id="edit-comment"
                          className="materialize-textarea"
                        ></textarea>
                      </div>
                    )} */}
                    {userDetails.username === comment.author.username && (
                        <div className="comment-controls">
                          {/* <span
                            className="mr-10"
                            onClick={() => {
                              setEditComment(true);
                            }}
                          >
                            <i class="fa fa-pencil" aria-hidden="true"></i>Edit
                          </span> */}
                          <span
                            onClick={() =>
                              deleteComment(article.slug, comment.id)
                            }
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>Delete
                          </span>
                        </div>
                      )}

                    {/* {userDetails.username === comment.author.username &&
                      editComment && (
                        <div className="comment-controls">
                          <span
                            className="mr-10"
                            onClick={() => {
                              setEditComment(false);
                            }}
                          >
                            Cancel
                          </span>
                          <span onClick={() => postComment(textareaComment.current.value)}>Post</span>
                        </div>
                      )} */}
                  </div>
                </div>
                <div className="comment-time">
                  {moment(comment.updatedAt).fromNow()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
