import axios from "./axios";

const setAuthorizationHeader = (token) => {
  if (token) {
    localStorage.setItem("TOKEN", token);
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    localStorage.removeItem("TOKEN");
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthorizationHeader;
