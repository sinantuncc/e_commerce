import * as types from "../actions/types";

const initialState = {
  loading: false,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export default loading;
