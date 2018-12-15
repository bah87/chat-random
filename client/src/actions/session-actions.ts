export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";

export const receiveCurrentUser = (username: string) => {
  return {
    type: RECEIVE_CURRENT_USER,
    username
  };
};
