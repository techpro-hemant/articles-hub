import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Header from "./Components/Header/Header";
import { Provider } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";
import store from "./Components/Store/Store";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Components/Home/Home";
import Auth from "./Auth";
import MainRoute from "./MainRoute";
function App() {
  return (
    <Provider store={store}>
      <Auth>
        <div className="App">
          <Router>
            <Header />
            <Switch>
              <MainRoute exact path="/" />
              <ProtectedRoute path="/home" component={Home} />
              <Redirect from="*" to="/" />
            </Switch>
          </Router>
        </div>
      </Auth>
    </Provider>
  );
}

export default App;
