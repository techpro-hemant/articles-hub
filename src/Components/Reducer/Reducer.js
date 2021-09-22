import {
  OPEN_LOGIN_MODAL,
  OPEN_REGISTER_MODAL,
  SET_USER_DETAILS,
  SET_IS_LOGGED_IN,
  SET_ARTICLE,
  SET_COMMENT_SECTION,
} from "../Constants/Constants";

const initialState = {
  loginModalStatus: false,
  registerModalStatus: false,
  isLoggedIn: true,
  userDetails: {},
  selectedArticle: {},
  updateCommentSection: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_LOGIN_MODAL: {
      return {
        ...state,
        loginModalStatus: action.payload,
      };
    }
    case OPEN_REGISTER_MODAL: {
      return {
        ...state,
        registerModalStatus: action.payload,
      };
    }
    case SET_USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case SET_IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    }
    case SET_ARTICLE: {
      return {
        ...state,
        selectedArticle: action.payload,
      };
    }
    case SET_COMMENT_SECTION: {
      return {
        ...state,
        updateCommentSection: action.payload,
      };
    }
    default:
      return state;
  }
}

export default rootReducer;
