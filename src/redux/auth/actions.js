// actions.js
export const loginUser = (user) => ({
  type: "LOGIN_USER",
  payload: user,
});

export const signUpUser = (user) => ({
  type: "SIGN_UP_USER",
  payload: user,
});
