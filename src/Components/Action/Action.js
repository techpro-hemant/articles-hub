import {
  OPEN_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
  SET_USER_DETAILS,
  SET_IS_LOGGED_IN,
  SET_ARTICLE,
  SET_COMMENT_SECTION,
} from "../Constants/Constants";

export function openLoginModal(payload) {
  return {
    type: OPEN_LOGIN_MODAL,
    payload,
  };
}
export function openRegisterModal(payload) {
  return {
    type: OPEN_REGISTER_MODAL,
    payload,
  };
}
export function setUserDetails(payload) {
  return {
    type: SET_USER_DETAILS,
    payload,
  };
}
export function setIsLoggedIn(payload) {
  return {
    type: SET_IS_LOGGED_IN,
    payload,
  };
}
export function setArticle(payload) {
  return {
    type: SET_ARTICLE,
    payload,
  };
}
export function setCommentSection(payload) {
  return {
    type: SET_COMMENT_SECTION,
    payload,
  };
}
