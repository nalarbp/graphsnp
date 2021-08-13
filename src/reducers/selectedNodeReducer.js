import { initialState } from ".";
import * as constant from "../utils/constants";

const selectedNodeReducer = (prevState, action) => {
  switch (action.type) {
    case constant.SELECTED_NODE:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.selectedNode;
      }
  }
};

export default selectedNodeReducer;
