import * as types from "./types";

export const modalOpen = (data, operation) => {
  var message = "";

  if (operation === "deleteProduct") {
    message = `Are you sure you want to delete the ${data.title}`;
  }

  return { type: types.MODAL_OPEN, payload: { data, operation, message } };
};

export const modalClose = (payload) => {
  return { type: types.MODAL_CLOSE, payload };
};
