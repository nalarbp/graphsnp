import { initialState } from ".";
import * as constant from "../utils/constants";

const colorLUTReducer = (prevState, action) => {
  switch (action.type) {
    case constant.COLOR_LUT:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.colorLUT;
      }
  }
};

export default colorLUTReducer;
