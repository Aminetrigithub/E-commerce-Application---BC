import { model } from "mongoose";
import catchAsyncError from "../middleware/catchAsyncError.js";
import AppError from "../services/AppError.js";

const deleteOne = (model) => { 
return  catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let results = await model.findByIdAndDelete(id);
    !results && next(new AppError("Category not found", 404));
    results && res.json({ message: "this category is deleted: ", results });
  })
 }

 export default deleteOne