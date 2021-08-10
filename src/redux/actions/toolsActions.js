import { ADD_GARBAGE, SHOW_MODAL } from "../types";

export const addGarbageAction = (status) => {
  return {
    type: ADD_GARBAGE,
    payload: status,
  };
};

export const showModalAction = (status) => {
  return {
    type: SHOW_MODAL,
    payload: status,
  };
};
