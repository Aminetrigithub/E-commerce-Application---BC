import { Schema, model, Types } from "mongoose";

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "name is required"],
      lowercase: true,
      minLength: [4, "name is too short"],
      unique: [true, "name is unique"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      // required: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    usedBy: [{
      type: Types.ObjectId,
      ref: "User",
    }],
    fromDate: String,
    toDate: String,
    amount: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

const couponModel = model("Coupon", couponSchema);

export default couponModel;
