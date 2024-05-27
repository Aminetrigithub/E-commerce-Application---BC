import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "name is unique"],
      trim: true,
      required: [true, "name is required"],
      minLength: [2, "name is too short"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "product price required."],
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    ratingAvg: {
      type: Number,
      min: [1, "rating average must be greater then 1"],
      max: [5, "rating average must be less then 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      minLength: [5, "description is too short"],
      maxLength: [300, "description is too long"],
      required: [true, "description is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
      required: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    imgCover: String,
    images: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "product category is required"],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
      required: [true, "product subcategory is required"],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      required: [true, "product brand is required"],
    },
  },
  {
    timestamps: true,
  }
);

const productModel = model("product", productSchema);

export default productModel;
