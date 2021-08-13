import { initialState } from ".";
import * as constant from "../utils/constants";

const selectDemoDataReducer = (prevState, action) => {
  switch (action.type) {
    case constant.SELECT_DEMO_DATA:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.selectDemoData;
      }
  }
};

export default selectDemoDataReducer;
