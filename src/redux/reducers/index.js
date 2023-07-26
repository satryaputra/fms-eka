import authReducer from "./authReducers";
import fileFolderReducer from "./fileFolderReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  fileFolder: fileFolderReducer,
});

export default rootReducer;
