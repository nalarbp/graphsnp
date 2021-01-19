import { initialState } from ".";
import * as constant from "../utils/constants";

const exposurePeriodReducer = (prevState, action) => {
  switch (action.type) {
    case constant.EXPERIOD_DATA:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.exposurePeriod;
      }
  }
};

export default exposurePeriodReducer;
