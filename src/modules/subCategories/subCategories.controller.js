import slugify from "slugify";
import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import { subCategoryModel } from "../../../databases/models/subcategory.model.js";

const createSubCategory = catchAsyncError(async (req, res, next) => {
  let { name, categoryId } = req.body;
  let results = new subCategoryModel({
    name,
    slug: slugify(name),
    category: categoryId,
  });
  let added = await results.save();
  res.status(201).json({ message: "subCategory created", added });
});

const getAllSubCategory = catchAsyncError(async (req, res, next) => {
  console.log("salam", req.params)
  let filters = {}
  if (req.params && req.params.id) {
    filters = { category: req.params.id };
  }
  let results = await subCategoryModel.find( filters );
  res.json({ message: "the all categories are: ", results });
});

const getSubCategoryById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await subCategoryModel.findById(id);
  !results && next(new AppError("Category not found", 404));
  results &&
    res.json({ message: "the category that you look for is:", results });
});

const updateSubCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { name, categoryId } = req.body;
  let results = await subCategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category: categoryId },
    { new: true }
  );
  // res.json({ message: "this category is updated: ", results });
  !results && next(new AppError("Subcategory not found to update", 404));
  results && res.json({ message: "this subcategory is updated: ", results });
  //   if(!results)
  //     {return res.status(404).json("category not found")}
  // res.json({message:"Done", results})
});

const deleteSubCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await subCategoryModel.findByIdAndDelete(id);
  //res.json({ message: "this category is deleted: ", results });
  !results && next(new AppError("subcategory not found", 404));
  results && res.json({ message: "this subcategory is deleted: ", results });
});

export {
  getAllSubCategory,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
