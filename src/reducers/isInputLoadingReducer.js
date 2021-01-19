import { initialState } from ".";
import * as constant from "../utils/constants";

const isInputLoadingReducer = (prevState, action) => {
  switch (action.type) {
    case constant.INPUT_LOADING:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.isInputLoading;
      }
  }
};

export default isInputLoadingReducer;
