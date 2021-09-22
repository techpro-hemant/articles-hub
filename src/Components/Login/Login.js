import React, { useState } from "react";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { setUserDetails, setIsLoggedIn } from "../Action/Action";
import "./Login.scss";
import setAuthorizationHeader from "../../utils";

function Login(props) {
  const dispatch = useDispatch();
  let emailRef = React.createRef("");
  let passwordref = React.createRef("");

  let [errors, setErrors] = useState({});

  const loginUser = () => {
    const requestBody = {
      user: {
        email: emailRef.current.value,
        password: passwordref.current.value,
      },
    };

    axios
      .post("/users/login", requestBody)
      .then((response) => {
        setAuthorizationHeader(response.data.user.token);
        dispatch(setUserDetails(response.data));
        dispatch(setIsLoggedIn(true));
        props.history.push("/home");
      })
      .catch((err) => {
        if (err && err.response) setErrors(err.response.data.errors);
        console.log(err.response);
      });
  };

  return (
    <div className="row container">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              ref={emailRef}
              id="loginEmail"
              type="text"
              className={errors && errors["email or password"] ? "invalid" : ""}
              required
            />
            <label htmlFor="loginEmail">Email</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              ref={passwordref}
              id="loginPassword"
              type="password"
              className={errors && errors["email or password"] ? "invalid" : ""}
              required
              minLength="8"
            />
            <label htmlFor="loginPassword">Password</label>
            {errors && errors["email or password"] && (
              <span className="error-text">
                email or password {errors["email or password"][0]}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <button
            className="col s6 offset-s3 waves-effect waves-light btn-large"
            onClick={(event) => {
              event.preventDefault();
              loginUser();
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
