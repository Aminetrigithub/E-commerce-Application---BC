import slugify from "slugify";
import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import productModel from "../../../databases/models/product.model.js";
import ApiFeatures from "../../utils/APIFeatures.js";

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  let results = new productModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "Product created", added });
});

// skip ... limit

const getAllProduct = catchAsyncError(async (req, res, next) => {
let apiFeature = new ApiFeatures(productModel.find(), req.query).pagination()
//  execute the query  
let results = await apiFeature.mongooseQuery;
  res.json({ message: "The all products are: ", page: apiFeature.page, results });
});

const getProductById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await productModel.findById(id);
  !results && next(new AppError("Product not found", 404));
  results &&
    res.json({ message: "The Product that you look for is:", results });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { title } = req.body;
  if (req.body.title) {
    req.body.slug = slugify(title);
  }
  let results = await productModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  !results && next(new AppError("Product not found to update", 404));
  results && res.json({ message: "this Product is updated: ", results });
});

const deleteProduct = deleteOne(productModel);

export {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};















/** Notes : l'opérateur de comparaison (query)
 * eq --> equal
 * ne --> not equal
 * gt --> greater than
 * gte --> greater than or equal
 * lt --> less than
 * lte --> less than or equal
 * in --> include
 * nin --> not include
 * 
 * const courses = await course
 *  .find({ price: { $gt: 10 , $lt:20} })
 * .find({ price: { $in: [10,20,50] } })
 * .find({ price: { $nin: [10,20,50] } })
 *  */ 

/** Notes : Opérateurs logique(query)
 * and 
 * or
 * 
 * const courses = await course
 * .and([{author:"amine"},{isPulished:true}])
 *.or([{_id:1},{},{}]) 
 *.select ([author:0,isPulished:1])
*/

// /**  like avec les expression réguliéres * const courses = await course 
// *   .find({ title: /.*ami.*/i } )
// *  .count() 
