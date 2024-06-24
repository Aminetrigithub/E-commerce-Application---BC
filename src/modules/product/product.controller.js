import slugify from "slugify";
import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import productModel from "../../../databases/models/product.model.js";



const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title)
  let results = new productModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "Product created", added });
});

const getAllProduct = catchAsyncError(async (req, res, next) => {
  let results = await productModel.find({});
  res.json({ message: "the all categories are: ", results });
});

const getProductById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await productModel.findById(id);
  !results && next(new AppError("Category not found", 404));
  results &&
    res.json({ message: "the category that you look for is:", results });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { title } = req.body;
  if(req.body.title ){
    req.body.slug = slugify(title)
  }
  let results = await productModel.findByIdAndUpdate(id,
    { ...req.body },
    { new: true }
  );
  !results && next(new AppError("Category not found to update", 404));
  results && res.json({ message: "this category is updated: ", results });
  });

const deleteProduct = deleteOne(productModel);

export {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
