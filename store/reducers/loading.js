import * as types from "../actions/types";

const loading = (state = false, action) => {
  switch (action.type) {
    case types.LOADING:
      return action.payload;

    default:
      return state;
  }
};

export default loading;
