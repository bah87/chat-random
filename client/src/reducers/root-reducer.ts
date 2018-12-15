// import merge from 'lodash/merge';
import { LOGIN_USER } from "../actions/session-actions";

const _nullUser = Object.freeze({
  username: null
});

const rootReducer = (state = _nullUser, action: any) => {
  Object.freeze(state);
  switch (action.type) {
    case LOGIN_USER:
      const username = action.username;
      return Object.assign({}, { username });
    default:
      return state;
  }
};

export default rootReducer;
