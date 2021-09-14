import * as types from "./types";

export const notifyInfo = (payload) => (dispatch) => {
  dispatch({ type: types.NOTIFY_INFO, payload });
  setTimeout(() => {
    dispatch(notifyReset());
  }, 5000);
};
export const notifySuccess = (payload) => (dispatch) => {
  dispatch({ type: types.NOTIFY_SUCCESS, payload });
  setTimeout(() => {
    dispatch(notifyReset());
  }, 4000);
};

export const notifyWarning = (payload) => (dispatch) => {
  dispatch({ type: types.NOTIFY_WARNING, payload });
  setTimeout(() => {
    dispatch(notifyReset());
  }, 6000);
};

export const notifyError = (payload) => (dispatch) => {
  dispatch({ type: types.NOTIFY_ERROR, payload });
  setTimeout(() => {
    dispatch(notifyReset());
  }, 7000);
};

export const notifyReset = () => ({ type: types.NOTIFY_RESET });
