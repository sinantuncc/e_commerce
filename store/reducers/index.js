import { combineReducers } from "redux";
import notify from "./notify";
import loading from "./loading";

const rootReducer = combineReducers({
  notify,
  loading,
});

export default rootReducer;
