import { initialState } from ".";
import * as constant from "../utils/constants";

const hammMatrixReducer = (prevState, action) => {
  switch (action.type) {
    case constant.MATRIX_HAMMING:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.hammMatrix;
      }
  }
};

export default hammMatrixReducer;
