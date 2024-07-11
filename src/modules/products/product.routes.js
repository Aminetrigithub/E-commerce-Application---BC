import express from 'express'
import * as productController from './product.controller.js'
import multer from 'multer';


const productRouter = express.Router()

// multer product
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/product");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
function fileFilter(req, file, cb) {
  console.log(file);
  if (file.mimetype.startsWith("text")) {
    cb(null, true);
  } else {
    cb(new AppError("invalid text", 400), false);
  }
}
const upload = multer({ storage, fileFilter })
// end multer





productRouter.route('/')
.get(productController.getAllProduct)
.post(upload.single('text'),productController.createProduct)


productRouter.route('/:id')
.get(productController.getAllProduct)
.put(productController.updateProduct)
.delete(productController.deleteProduct)

export default productRouter
