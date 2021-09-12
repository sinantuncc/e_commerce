import * as types from "../actions/types";

const initialState = {
  isLogged: false,
  token: null,
  user: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH:
      return action.payload;
    // return {
    //   ...state,
    //   isLogged: action.payload.isLogged,
    //   token: action.payload.token,
    //   user: action.payload.user,
    // };

    default:
      return state;
  }
};

export default auth;
