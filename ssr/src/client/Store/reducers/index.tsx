import { combineReducers } from "redux";
import { FetchCurrentUserReducer } from "./current-user";
import { ImageUploadReducer } from "./image-upload";

const rootReducer = combineReducers({
  currentUser: FetchCurrentUserReducer,
  imageData: ImageUploadReducer,
});

export default rootReducer;
