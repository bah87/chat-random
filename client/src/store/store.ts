import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/root-reducer";
import thunk from "../middleware/thunk";

const configureStore = (_preloadedState: any) => {
  return createStore(rootReducer, {}, applyMiddleware(thunk));
};

export default configureStore;
