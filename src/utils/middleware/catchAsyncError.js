import AppError from "../services/AppError.js";

const catchAsyncError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next)
    .catch((err) => {
    next(new AppError("Something went wrong", 406));
    });
  };
};

export default catchAsyncError