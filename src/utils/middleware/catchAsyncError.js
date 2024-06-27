import AppError from "../services/AppError.js";

const catchAsyncError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next)
    .catch((err) => {
    next(err,console.log(err));
    });
  };
};

export default catchAsyncError