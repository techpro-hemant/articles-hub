import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../axios";
import "./Register.scss";
import { setUserDetails, setIsLoggedIn } from "../Action/Action";
import setAuthorizationHeader from "../../utils";

function Register(props) {
  const dispatch = useDispatch();

  let usernameRef = React.createRef("");
  let emailRef = React.createRef("");
  let passwordRef = React.createRef("");

  let [errors, setErrors] = useState({});

  const registerUser = () => {
    let requestBody = {
      user: {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    };
    axios
      .post("/users", requestBody)
      .then((response) => {
        setAuthorizationHeader(response.data.user.token);
        dispatch(setUserDetails(response.data));
        dispatch(setIsLoggedIn(true));
        props.history.push("/home");
        
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
        console.log(err.response);
      });
  };

  return (
    <div className="row container">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              ref={usernameRef}
              id="username"
              type="text"
              className={errors && errors.username ? "invalid" : ""}
              required
            />
            <label htmlFor="username">Username</label>
            {errors && errors.username && (
              <span className="error-text">username {errors.username[0]}</span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              ref={emailRef}
              id="email"
              type="text"
              className={errors && errors.email ? "invalid" : ""}
              required
            />
            <label htmlFor="email">Email</label>
            {errors && errors.email && (
              <span className="error-text">email {errors.email[0]}</span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input
              ref={passwordRef}
              id="password"
              type="password"
              className={errors && errors.password ? "invalid" : ""}
              required
              minLength="8"
            />
            <label htmlFor="password">Password</label>
            {errors && errors.password && (
              <span className="error-text">password {errors.password[0]}</span>
            )}
          </div>
        </div>
        <div className="row">
          <button
            className="col s6 offset-s3 waves-effect waves-light btn-large"
            onClick={(event) => {
              event.preventDefault();
              registerUser();
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
