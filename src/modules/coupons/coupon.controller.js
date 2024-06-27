import slugify from "slugify";
import AppError from "../../utils/services/AppError.js";
import catchAsyncError from "../../utils/middleware/catchAsyncError.js";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import couponModel from "../../../databases/models/coupon.model.js";


const createCoupon = catchAsyncError(async (req, res, next) => {
  let { name } = req.body;
  let results = new couponModel({ name, slug: slugify(name) });
  let added = await results.save();
  res.status(201).json({ message: "Coupon created", added });
});

const getAllCoupon = catchAsyncError(async (req, res, next) => {
  let results = await couponModel.find({});
  res.json({ message: "the all categories are: ", results });
});

const getCouponById = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let results = await couponModel.findById(id);
  !results && next(new AppError("Coupon not found", 404));
  results &&
    res.json({ message: "the Coupon that you look for is:", results });
});

const updateCoupon = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  let { name } = req.body;
  let results = await couponModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  !results && next(new AppError("Coupon not found to update", 404));
  results && res.json({ message: "this Coupon is updated: ", results });

});

const deleteCoupon = deleteOne(CouponModel);

export {
getAllCoupon,
getCouponById,
createCoupon,
updateCoupon,
deleteCoupon,
};
