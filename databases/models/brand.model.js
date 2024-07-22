import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
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
    logo: String,
  },
  {
    timestamps: true,
  }
);

brandSchema.post("init", (doc) => {
  doc.logo = process.env.BASE_URL + "brand/" + doc.logo;
});

export const brandModel = mongoose.model("brand", brandSchema);
