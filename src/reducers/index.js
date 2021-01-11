import { combineReducers } from "redux";
import sequenceReducer from "./sequenceReducer";
import navSettingsReducer from "./navSettingsReducer";
import graphSettingsReducer from "./graphSettingsReducer";
import collectionDatesReducer from "./collectionDatesReducer";
import exposurePeriodReducer from "./exposurePeriodReducer";

export const initialState = {
  sequence: null,
  collectionDates: null,
  exposurePeriod: null,
  graphSettings: {
    isUserFilterEdges: { status: false, cutoff: 0 },
    isUserReDraw: false,
    method: "slv",
    layout: "cose",
    exportFormat: "dot",
    isUserDownloading: false,
  },
  navSettings: {
    navLocation: null,
  },
};
const rootReducer = combineReducers(
  {
    sequence: sequenceReducer,
    collectionDates: collectionDatesReducer,
    exposurePeriod: exposurePeriodReducer,
    navSettings: navSettingsReducer,
    graphSettings: graphSettingsReducer,
  },
  initialState
);

export default rootReducer;
