import { createStore } from "redux";
import rootReducer from "../Reducer/Reducer";

const store = createStore(rootReducer);

export default store;
