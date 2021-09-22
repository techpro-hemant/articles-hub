import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
// import Main from "./Components/Main/Main";

function ProtectedRoute({ component: Component, ...rest }) {
  let { isLoggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
