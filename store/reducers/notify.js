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
        color: "toast_info",
      };
    case types.NOTIFY_SUCCESS:
      return {
        ...state,
        message: action.payload,
        color: "toast_success",
      };
    case types.NOTIFY_WARNING:
      return {
        ...state,
        message: action.payload,
        color: "toast_warning",
      };
    case types.NOTIFY_ERROR:
      return {
        ...state,
        message: action.payload,
        color: "toast_error",
      };
    case types.NOTIFY_RESET:
      return (state = initialState);

    default:
      return state;
  }
};

export default notify;
