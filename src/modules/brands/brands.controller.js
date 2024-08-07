import slugify from "slugify";
import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import { brandModel } from "../../../databases/models/brand.model.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import ApiFeatures from "../../utils/APIFeatures.js";

const createBrand = catchAsyncError(async (req, res, next) => {

  req.body.slug = slugify(req.body.name)
  req.body.logo = req.file.fileName;
  let results = new brandModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "Brand created", added });
});

const getAllBrand = catchAsyncError(async (req, res, next) => {
  let apiFeature = new ApiFeatures(brandModel.find(), req.query).pagination().sort().fields()
  let results = await apiFeature.mongooseQuery;
  res.json({ message: "the all brands are: ", results });
});

const getBrandById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await brandModel.findById(id);
  !results && next(new AppError("Brand not found", 404));
  results &&
    res.json({ message: "the brand that you look for is:", results });
});

const updateBrand = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  req.body.slug = slugify(req.body.name);
  if(req.file) req.body.logo = req.file.fileName;
  let results = await brandModel.findByIdAndUpdate(
    id, req.body, { new: true }
  );
  !results && next(new AppError("Brand not found to update", 404));
  results && res.json({ message: "this brand is updated: ", results });
});

const deleteBrand = deleteOne(brandModel)

export { createBrand, getAllBrand, getBrandById, updateBrand, deleteBrand };
