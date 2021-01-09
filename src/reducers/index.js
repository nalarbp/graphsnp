import { combineReducers } from "redux";
import sequenceReducer from "./sequenceReducer";
import navSettingsReducer from "./navSettingsReducer";

export const initialState = {
  sequence: null,
  navSettings: {
    navLocation: null,
  },
};
const rootReducer = combineReducers(
  {
    sequence: sequenceReducer,
    navSettings: navSettingsReducer,
  },
  initialState
);

export default rootReducer;
