import { model } from "mongoose";
import catchAsyncError from "../middleware/catchAsyncError.js";
import AppError from "../services/AppError.js";

const deleteOne = (model) => { 
return  catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let results = await model.findByIdAndDelete(id);
    !results && next(new AppError("Not found to delete", 404));
    results && res.json({ message: "Deleted with success: ", results });
  })
 }
export default deleteOne
 