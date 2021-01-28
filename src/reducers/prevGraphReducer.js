import { initialState } from ".";
import * as constant from "../utils/constants";

const prevGraphReducer = (prevState, action) => {
  switch (action.type) {
    case constant.PREV_GRAPH:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.prevGraph;
      }
  }
};

export default prevGraphReducer;
