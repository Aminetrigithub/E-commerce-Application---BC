import AppError from "../services/AppError.js";

const catchAsyncError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next)
<<<<<<< HEAD
    // .catch((err) => {
    // next(new AppError("Something went wrong", 406));
    // });
=======
    .catch((err) => {
    next(new AppError("Something went wrong", 406));
    });
>>>>>>> 3c76fd021d4d74f0197824b892c4326aad3efad4
  };
};

export default catchAsyncError