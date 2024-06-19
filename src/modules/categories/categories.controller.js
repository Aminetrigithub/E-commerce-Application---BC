import { categoryModel } from "../../../databases/models/category.model.js";
import slugify from "slugify";
import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";



const createCategory = catchAsyncError(async (req, res, next) => {
  let { name } = req.body;
  let results = new categoryModel({ name, slug: slugify(name) });
  let added = await results.save();
  res.status(201).json({ message: "Category created", added });
});

const getAllCategory = catchAsyncError(async (req, res, next) => {
  let results = await categoryModel.find({});
  res.json({ message: "the all categories are: ", results });
});

const getCategoryById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await categoryModel.findById(id);
  !results && next(new AppError("Category not found", 404));
  results &&
    res.json({ message: "the category that you look for is:", results });
});

const updateCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  let results = await categoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name, "#") },
    { new: true }
  );
  // res.json({ message: "this category is updated: ", results });
  !results && next(new AppError("Category not found to update", 404));
  results && res.json({ message: "this category is updated: ", results });
  //   if(!results)
  //     {return res.status(404).json("category not found")}
  // res.json({message:"Done", results})
});

const deleteCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await categoryModel.findByIdAndDelete(id);
  //res.json({ message: "this category is deleted: ", results });
  !results && next(new AppError("Category not found", 404));
  results && res.json({ message: "this category is deleted: ", results });
});

export {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
