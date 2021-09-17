import * as types from "../actions/types";

const initialState = {
  cart: [],
};
const cart = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CART:
      return action.payload instanceof Array
        ? {
            cart: [...action.payload],
          }
        : {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };

    default:
      return state;
  }
};

export default cart;
