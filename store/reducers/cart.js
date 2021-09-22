import * as types from "../actions/types";

const cart = (state = [], action) => {
  switch (action.type) {
    case types.ADD_CART:
      return action.payload instanceof Array
        ? [...action.payload]
        : [...state, action.payload];

    case types.REMOVE_FROM_CART:
      return [...state.filter((item) => item._id !== action.payload)];
    case types.RESET_CART:
      return [];
    default:
      return state;
  }
};

export default cart;
