/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import "./Header.scss";
import M from "materialize-css";
import { AuthContext } from "../../Auth";
import setAuthorizationHeader from "../../utils";
import { withRouter } from "react-router";

function Header(props) {
  let { isLoggedIn } = useContext(AuthContext);

  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, {
      coverTrigger: false,
      alignment: "right",
      autoTrigger: true,
      hover: true,
      inDuration: 300,
      outDuration: 225,
    });
  });

  const logoutUser = () => {
    setAuthorizationHeader("");
    props.history.push("/");
  };

  return (
    <header className="row valign-wrapper mb-0">
      <div className="col s5 offset-s1 logo">
        {/* <i className="fa fa-book mr-10" aria-hidden="true"></i> */}
        <img src="../../logo.png" alt=""/>
        <span>Read Articles</span>
      </div>
      {!isLoggedIn && (
        <div className="col s1 offset-s4 actions-text">
          <a
            href="javascript:void(0)"
            onClick={() => {
              var elem = document.getElementById("login");
              var instance = M.Modal.getInstance(elem);
              instance.open();
            }}
          >
            Login
          </a>
        </div>
      )}
      {!isLoggedIn && (
        <div className="col s1 actions-text">
          <a
            href="javascript:void(0)"
            onClick={() => {
              var elem = document.getElementById("register");
              var instance = M.Modal.getInstance(elem);
              instance.open();
            }}
          >
            Register
          </a>
        </div>
      )}
      {isLoggedIn && (
        <div className="col offset-s5 actions-text profile-logo valign-wrapper">
          <a
            href=""
            onClick={(e) => {
              logoutUser();
            }}
          >
            Logout
          </a>
        </div>
      )}
      <div className="col s1"></div>
    </header>
  );
}

export default withRouter(Header);
