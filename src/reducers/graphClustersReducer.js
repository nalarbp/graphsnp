import { initialState } from ".";
import * as constant from "../utils/constants";

const graphClusterReducer = (prevState, action) => {
  switch (action.type) {
    case constant.GRAPH_CLUSTER:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.graphClusters;
      }
  }
};

export default graphClusterReducer;
