import { useDispatch } from "react-redux";
import { notifyInfo } from "../actions/notify";
import * as types from "../actions/types";

const initialState = {
  cart: [],
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CART:
      const check = state.cart.every((item) => {
        return item._id !== action.payload._id;
      });

      if (!check) return state;

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    default:
      return state;
  }
};

export default cart;
