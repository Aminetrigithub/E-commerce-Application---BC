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
    logo: String
  },
  {
    timestamps: true,
  }
);



export const brandModel = mongoose.model("brand", brandSchema);


