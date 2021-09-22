import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import Main from "./Components/Main/Main";

function MainRoute({ props }) {
  let { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? (
    <Redirect to="/home" />
  ) : (
    <Route path="/" component={Main} />
  );
}

export default MainRoute;
