import { notifyError, notifySuccess } from "./notify";
import * as types from "./types";

export const addToCart = (payload) => (dispatch) => {
  try {
    dispatch({
      type: types.ADD_CART,
      payload: { ...payload, quantity: 1 },
    });
    dispatch(notifySuccess(`${payload.title} added to cart.`));
  } catch (error) {
    dispatch(notifyError("error in cart action"));
  }
};

export const increase = (data, id) => (dispatch) => {
  const newData = [...data];

  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });

  return dispatch({ type: types.ADD_CART, payload: newData });
};

export const decrease = (data, id) => (dispatch) => {
  const newData = [...data];

  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });

  return dispatch({ type: types.ADD_CART, payload: newData });
};

export const removeFromCart = (id) => ({
  type: types.REMOVE_FROM_CART,
  payload: id,
});

export const resetCart = () => ({ type: types.RESET_CART });
