import { combineReducers } from "redux";
import notify from "./notify";
import loading from "./loading";
import auth from "./auth";
import cart from "./cart";

const rootReducer = combineReducers({
  notify,
  loading,
  auth,
  cart,
});

export default rootReducer;
