import { combineReducers } from "redux";
import sequenceReducer from "./sequenceReducer";

export const initialState = {
  sequence: null,
};
const rootReducer = combineReducers(
  {
    sequence: sequenceReducer,
  },
  initialState
);

export default rootReducer;
