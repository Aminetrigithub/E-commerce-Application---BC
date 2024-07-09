import express from 'express'
import * as categoryController from './categories.controller.js'
import subCategoryRouter from '../subCategories/subCategories.routes.js'
import { validation } from '../../utils/middleware/validation.js'
import { createCategorySchema, getCategoryByIdSchema } from './categories.validator.js'
import multer from 'multer'
import AppError from '../../utils/services/AppError.js'






const categoryRouter = express.Router()

// categoryRouter.get('/',categoryController.getAllCategory)
// categoryRouter.post('/',categoryController.createCategory)

//  http://localhost:3000/api/v1/category
categoryRouter.use('/:id/subcategory', subCategoryRouter)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/category')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

function fileFilter (req, file, cb) {
  console.log(file)
  if(file.mimetype.startsWith("image")){
    cb(null, true)
  }else{
    cb(new AppError("invalid image", 400), false)
  }


}

const upload = multer({ storage, fileFilter })



categoryRouter.route('/')
.get(categoryController.getAllCategory)
.post(upload.single('image'), validation(createCategorySchema), categoryController.createCategory)

// categoryRouter.get('/:id',categoryController.getCategoryById)
// categoryRouter.put('/:id',categoryController.updateCategory)
// categoryRouter.delete('/:id',categoryController.deleteCategory)

categoryRouter.route('/:id')
.get(validation(getCategoryByIdSchema), categoryController.getCategoryById)
.put(categoryController.updateCategory)
.delete(categoryController.deleteCategory)

export default categoryRouter
