import mongoose from "mongoose";

const subCategorySchema =  mongoose.Schema(
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
      required: true
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    }
  },
  {
    timestamps: true,
  }
);

export const subCategoryModel = model("subCategory", subCategorySchema);

