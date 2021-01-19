import { initialState } from ".";
import * as constant from "../utils/constants";

const graphMatrixReducer = (prevState, action) => {
  switch (action.type) {
    case constant.MATRIX_DATA:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.graphMatrix;
      }
  }
};

export default graphMatrixReducer;
