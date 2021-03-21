import { IMAGE_UPLOAD } from "../actions/index";

//? async reducer function
export const ImageUploadReducer = (state = null, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD:
      return action.payload || false;
    default:
      return state;
  }
};
