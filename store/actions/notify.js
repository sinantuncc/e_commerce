import * as types from "./types";

export const notifyInfo = (payload) => ({ type: types.NOTIFY_INFO, payload });

export const notifySuccess = (payload) => ({
  type: types.NOTIFY_SUCCESS,
  payload,
});

export const notifyError = (payload) => ({ type: types.NOTIFY_ERROR, payload });
export const notifyReset = () => ({ type: types.NOTIFY_RESET });
