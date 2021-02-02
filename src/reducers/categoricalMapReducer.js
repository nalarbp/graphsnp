import { initialState } from ".";
import * as constant from "../utils/constants";

const categoricalMapReducer = (prevState, action) => {
  switch (action.type) {
    case constant.METADATA_CATEGORICAL:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.categoricalMap;
      }
  }
};

export default categoricalMapReducer;
