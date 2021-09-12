import * as types from "./types";

export const notifyInfo = (payload) => (dispatch) => {
  dispatch({ type: types.NOTIFY_INFO, payload });
  setTimeout(() => {
    dispatch(notifyReset());
  }, 4500);
};
export const notifySuccess = (payload) => (dispatch) => {
  dispatch({ type: types.NOTIFY_SUCCESS, payload });
  setTimeout(() => {
    dispatch(notifyReset());
  }, 4500);
};

export const notifyError = (payload) => (dispatch) => {
  dispatch({ type: types.NOTIFY_ERROR, payload });
  setTimeout(() => {
    dispatch(notifyReset());
  }, 4500);
};

export const notifyReset = () => ({ type: types.NOTIFY_RESET });
