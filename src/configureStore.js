import { createStore, applyMiddleware } from "redux";
import rootReducer, { initialState } from "./reducers";
import ReduxPromise from "redux-promise";
const configureStore = () => {
  const createStorewithMiddleware = applyMiddleware(ReduxPromise)(createStore);
  const store = createStorewithMiddleware(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
export default configureStore;
