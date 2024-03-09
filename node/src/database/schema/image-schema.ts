import { Schema } from "mongoose";
import { IImage } from "../../@types/user";

const imageSchema = new Schema<IImage>({
  alt: {
    type: String,
    maxlength: 200,
    required: true,
  },
  url: {
    type: String,
    maxlength: 200,
    required: true,
  },
});

export { imageSchema };
