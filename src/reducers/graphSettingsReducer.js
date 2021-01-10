import { initialState } from ".";
import * as constant from "../utils/constants";

const graphSettingsReducer = (prevState, action) => {
  switch (action.type) {
    case constant.SETTING_IS_USER_REDRAW:
      let newState_isUserReDraw = Object.assign({}, prevState);
      if (action.payload !== prevState.isUserReDraw) {
        newState_isUserReDraw.isUserReDraw = action.payload;
      }
      return newState_isUserReDraw;

    case constant.SETTING_METHOD:
      let newState_method = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.method) {
        newState_method.method = action.payload;
      }
      return newState_method; // if no change return same state with before

    case constant.SETTING_LAYOUT:
      let newState_layout = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.layout) {
        newState_layout.layout = action.payload;
      }
      return newState_layout;

    case constant.SETTING_EXPORT_FORMAT:
      let newState_exportFormat = Object.assign({}, prevState);
      if (action.payload && action.payload !== prevState.exportFormat) {
        newState_exportFormat.exportFormat = action.payload;
      }
      return newState_exportFormat;

    case constant.SETTING_IS_USER_DOWNLOADING:
      let newState_isUserDownloading = Object.assign({}, prevState);
      if (action.payload !== prevState.isUserDownloading) {
        newState_isUserDownloading.isUserDownloading = action.payload;
      }
      return newState_isUserDownloading;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.graphSettings;
      }
  }
};

export default graphSettingsReducer;
