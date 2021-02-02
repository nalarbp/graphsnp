import { initialState } from ".";
import * as constant from "../utils/constants";

const phyloTimeTreeReducer = (prevState, action) => {
  switch (action.type) {
    case constant.TIME_TREE_DATA:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.phyloTimeTree;
      }
  }
};

export default phyloTimeTreeReducer;
