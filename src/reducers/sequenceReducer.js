import { initialState } from ".";
import * as constant from "../utils/constants";

const sequenceReducer = (prevState, action) => {
  switch (action.type) {
    case constant.SEQ_DATA:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.sequence;
      }
  }
};

export default sequenceReducer;
