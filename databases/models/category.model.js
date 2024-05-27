import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is unique"],
      trim: true,
      required: [true, "name is required"],
      minLength: [2, "name is too short"],
     
    },
    slug: {
      type: String,
      lowercase: true,
      required: [true, "name is required"],
    },
    image: String,
  },
  {timestamps: true,}
);

export const categoryModel = mongoose.model("category", categorySchema);


