import { ImageUpload } from "./image-upload";
import { GetPresignedUrl } from "./get-url";

export default (app: any) => {
  app.use(ImageUpload);
  app.use(GetPresignedUrl);
};
