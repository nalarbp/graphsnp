import { initialState } from ".";
import * as constant from "../utils/constants";

const collectionDatesReducer = (prevState, action) => {
  switch (action.type) {
    case constant.COLDATE_DATA:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.sequence;
      }
  }
};

export default collectionDatesReducer;
