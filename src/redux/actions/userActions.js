import { SET_CURRENT_USER, FROM_SIGN_UP } from "./../types";

export const setCurrentUserAction = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const fromSignUpAction = (status) => ({
  type: FROM_SIGN_UP,
  payload: status,
});
