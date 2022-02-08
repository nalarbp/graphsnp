import { initialState } from ".";
import * as constant from "../utils/constants";

const projectsReducer = (prevState, action) => {
  switch (action.type) {
    case constant.PROJECTS_JSON:
      return action.payload;

    default:
      if (prevState) {
        return prevState;
      } else {
        return initialState.projectJSON;
      }
  }
};

export default projectsReducer;
