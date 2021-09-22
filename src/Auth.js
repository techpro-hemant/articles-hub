import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "./axios";
import jwt from "jsonwebtoken";
import { setUserDetails, setIsLoggedIn } from "./Components/Action/Action";

export const AuthContext = React.createContext();

function Auth({ children }) {
  let isLoggedIn = useSelector((state) => state.isLoggedIn);
  
  const dispatch = useDispatch();
  let token = localStorage.getItem("TOKEN");

  if (token) {
    try {
      let username = jwt.decode(token).username;
      axios
        .get(`/profiles/${username}`)
        .then((response) => {
          dispatch(setIsLoggedIn(true));
          dispatch(setUserDetails(response.data));
          // setAuthorizationHeader(response.data.user.token);
        })
        .catch((err) => {
          dispatch(setIsLoggedIn(false));
          console.log(err);
        });
    } catch (err) {
      dispatch(setIsLoggedIn(false));
    }
  } else {
    dispatch(setIsLoggedIn(false));
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
