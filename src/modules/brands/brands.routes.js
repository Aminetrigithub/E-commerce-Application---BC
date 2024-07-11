import express from "express";
import * as brandController from "./brands.controller.js";
import { validation } from "../../utils/middleware/validation.js";
import { createBrandSchema, deleteBrandSchema, updateBrandSchema } from "./brand.validator.js";
import multer from "multer";
import { uploadSingleFile } from "../../utils/middleware/fileUploads.js";

const brandRouter = express.Router();


// multer du brand 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/brand");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
function fileFilter(req, file, cb) {
  console.log(file);
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new AppError("invalid video", 400), false);
  }
}
const upload = multer({ storage, fileFilter })
// end multer


brandRouter
  .route("/")
  .get(brandController.getAllBrand)
  .post(uploadSingleFile("brand","logo"),validation(createBrandSchema), brandController.createBrand);

brandRouter
  .route("/:id")
  .get(brandController.getBrandById)
  .put(validation(updateBrandSchema), brandController.updateBrand)
  .delete(validation(deleteBrandSchema), brandController.deleteBrand);

export default brandRouter;
