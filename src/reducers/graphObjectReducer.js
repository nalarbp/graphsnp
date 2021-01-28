import { initialState } from ".";
import * as constant from "../utils/constants";

const graphObjectReducer = (prevState, action) => {
  switch (action.type) {
    case constant.GRAPH_OBJECT:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.graphObject;
      }
  }
};

export default graphObjectReducer;
