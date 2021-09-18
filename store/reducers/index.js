import { combineReducers } from "redux";
import notify from "./notify";
import loading from "./loading";
import auth from "./auth";
import cart from "./cart";
import modal from "./modal";

const rootReducer = combineReducers({
  notify,
  loading,
  auth,
  cart,
  modal,
});

export default rootReducer;
