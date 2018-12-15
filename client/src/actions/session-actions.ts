export const LOGIN_USER = "LOGIN_USER";

export const loginUser = (username: string) => {
  return {
    type: LOGIN_USER,
    username
  };
};
