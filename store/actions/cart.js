import { notifyError, notifySuccess } from "./notify";
import * as types from "./types";

export const addToCart = (payload) => (dispatch) => {
  try {
    dispatch({ type: types.ADD_CART, payload });
    dispatch(notifySuccess(`${payload.title} added to cart.`));
    //SaveDataToLocalStorage(payload);
  } catch (error) {
    dispatch(notifyError("error in cart action"));
  }
};

// function SaveDataToLocalStorage(data) {
//   var a = [];
//   a = JSON.parse(localStorage.getItem("_cart_")) || [];
//   a.push(data);
//   localStorage.setItem("_cart_", JSON.stringify(a));
// }
