import { initialState } from ".";
import * as constant from "../utils/constants";

const loadingModalReducer = (prevState, action) => {
  switch (action.type) {
    case constant.IS_SHOWING_LOADING_MODAL:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.isShowingLoadingModal;
      }
  }
};

export default loadingModalReducer;
