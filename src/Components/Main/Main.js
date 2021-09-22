/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import M from "materialize-css";
import "./Main.scss";
import Login from "../Login/Login";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal, openRegisterModal } from "../Action/Action";
import Register from "../Register/Register";

function Main(props) {
  const loginModalStatus = useSelector((state) => state.loginModalStatus);
  const registerModalStatus = useSelector((state) => state.registerModalStatus);
  const dispatch = useDispatch();

  const tags = [
    "Future",
    "OneZero",
    "Technology",
    "Elemental",
    "Health",
    "Science",
    "GEN",
    "Business",
    "Work",
    "Culture",
    "Programming",
    "Design",
    "Zora",
    "Tenderly",
    "Food",
    "NeuroScience",
    "Level",
    "Politics",
    "Relationships",
    "Self",
    "Startups",
    "Cryptocurrency",
    "Data Science",
    "Productivity",
    "Artificial Intelligence",
  ];
  document.addEventListener("DOMContentLoaded", function () {
    var loginElem = document.getElementById("login");
    M.Modal.init(loginElem, {
      onOpenStart: () => {
        dispatch(openLoginModal(true));
      },
      onCloseEnd: () => {
        dispatch(openLoginModal(false));
      },
    });

    var registerElem = document.getElementById("register");
    M.Modal.init(registerElem, {
      onOpenStart: () => {
        dispatch(openRegisterModal(true));
      },
      onCloseEnd: () => {
        dispatch(openRegisterModal(false));
      },
    });
  });

  return (
    <div className="main row p-10 container">
      <div className="offset-s1 center-align summary-heading">
        Dive deeper on topics that matter to you.
      </div>
      <div className="offset-s1 center-align summary-text">
        Select what you're into. We'll help you find great things to read.
      </div>
      <div className="center-align mt-40 mb-20">
        {tags.map((tag, index) => {
          return (
            <div className="chip" key={index}>
              <div>
                <div className="hash-icon mr-10">
                  <i className="fa fa-hashtag" aria-hidden="true"></i>
                </div>
                <div>{tag}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="register-button pt-20">
        <button
          className="get-started waves-effect waves-light btn-large"
          onClick={() => {
            var elem = document.getElementById("register");
            var instance = M.Modal.getInstance(elem);
            instance.open();
          }}
        >
          Get Started
        </button>
        <div id="register" className="modal modal-fixed-footer">
          <div className="modal-content">
            <div className="center-align modal-heading-text">Register</div>
            <div className="center-align pb-10 moto-line">
              Create an account to receive great stories in your inbox,
              personalize your homepage, and follow authors and topics that you
              love.
            </div>
            {registerModalStatus && <Register {...props} />}
            <p className="center-align">
              Already have account?{" "}
              <a
                className="popup-link"
                href="javascript:void(0);"
                onClick={() => {
                  var registerElem = document.getElementById("register");
                  var registerInstance = M.Modal.getInstance(registerElem);
                  registerInstance.close();

                  var loginElem = document.getElementById("login");
                  var loginInstance = M.Modal.getInstance(loginElem);
                  loginInstance.open();
                }}
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        <div id="login" className="modal modal-fixed-footer">
          <div className="modal-content">
            <div className="center-align modal-heading-text">Welcome back</div>
            <div className="center-align pb-40 moto-line">
              Sign in to get personalized story recommendations, follow authors
              and topics you love, and interact with stories.
            </div>
            {loginModalStatus && <Login {...props} />}
            <p className="center-align">
              No Account?{" "}
              <a
                className="popup-link"
                href="javascript:void(0);"
                onClick={() => {
                  var loginElem = document.getElementById("login");
                  var loginInstance = M.Modal.getInstance(loginElem);
                  loginInstance.close();

                  var registerElem = document.getElementById("register");
                  var registerInstance = M.Modal.getInstance(registerElem);
                  registerInstance.open();
                }}
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
