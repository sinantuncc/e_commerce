import * as types from "../actions/types";

const initialState = {
  message: "",
  color: "",
};

const notify = (state = initialState, action) => {
  switch (action.type) {
    case types.NOTIFY_INFO:
      return {
        ...state,
        message: action.payload,
        color: "info",
      };
    case types.NOTIFY_SUCCESS:
      return {
        ...state,
        message: action.payload,
        color: "success",
      };
    case types.NOTIFY_ERROR:
      return {
        ...state,
        message: action.payload,
        color: "danger",
      };
    case types.NOTIFY_RESET:
      return (state = initialState);

    default:
      return state;
  }
};

export default notify;
