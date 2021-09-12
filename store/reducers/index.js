import { combineReducers } from "redux";
import notify from "./notify";
import loading from "./loading";
import auth from "./auth";

const rootReducer = combineReducers({
  notify,
  loading,
  auth,
});

export default rootReducer;
