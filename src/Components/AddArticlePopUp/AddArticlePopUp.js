/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React from "react";
import "./AddArticlePopUp.scss";
import M from "materialize-css";
import axios from "../../axios";
import { withRouter } from "react-router-dom";

function AddArticlePopUp(props) {
  let titleRef = React.createRef();
  let descriptionRef = React.createRef();
  let bodyRef = React.createRef();
  // let [chipsdata, setChipsdata] = useState([]);

  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.getElementById("tag-list");
    M.Chips.init(elems, {
      placeholder: "Enter a tag",
      secondaryPlaceholder: "+Tag"
    });
  });

  const addArticle = () => {
    console.log(M.Chips);
    var instance = M.Chips.getInstance(document.getElementById("tag-list"));
    let chipsData = instance.chipsData;

    let requestBody = {
      article: {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        body: bodyRef.current.value,
        tagList: chipsData,
      },
    };

    axios
      .post("/articles", requestBody)
      .then((response) => {
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        bodyRef.current.value = "";
        instance.chipsData = [];
        M.Modal.getInstance(document.getElementById("add-article")).close();
        // setChipsdata([]);
        props.history.push(props.location.pathName);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="add-article" className="modal add-article">
      <div className="modal-content">
        <div className="add-article-label">Add Article</div>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  ref={titleRef}
                  id="title"
                  type="text"
                  className="validate"
                />
                <label htmlFor="title">Title</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  ref={descriptionRef}
                  id="description"
                  className="materialize-textarea"
                ></textarea>
                <label htmlFor="description">Description</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  ref={bodyRef}
                  id="body"
                  className="materialize-textarea"
                ></textarea>
                <label htmlFor="body">Body</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <div className="chips chips-placeholder" id="tag-list"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="javascript:void(0);"
          onClick={addArticle}
          className="waves-effect waves-light btn"
        >
          Add Article
        </a>
      </div>
    </div>
  );
}

export default withRouter(AddArticlePopUp);
