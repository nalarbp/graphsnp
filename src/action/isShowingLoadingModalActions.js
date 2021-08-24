import * as constant from "../utils/constants";

export default function isShowingLoadingModalToStore(val) {
  return {
    type: constant.IS_SHOWING_LOADING_MODAL,
    payload: val,
  };
}
