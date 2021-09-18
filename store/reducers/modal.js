import * as types from "../actions/types";

const initialState = {
  data: {},
  operation: "",
  message: "",
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case types.MODAL_OPEN:
      return {
        ...action.payload,
      };

    // case types.MODAL_CLOSE:
    //   return initialState;
    default:
      return state;
  }
};

export default modal;
