import * as types from "./types";

export const addToCart = (payload) => {
  SaveDataToLocalStorage(payload);
  return { type: types.ADD_CART, payload };
};

function SaveDataToLocalStorage(data) {
  var _cart01_ = [];
  _cart01_ = JSON.parse(localStorage.getItem("_cart01_")) || [];
  _cart01_.push(data);
  localStorage.setItem("_cart01_", JSON.stringify(_cart01_));
}
