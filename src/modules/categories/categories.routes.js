import express from 'express'
import * as categoryController from './categories.controller.js'
import subCategoryRouter from '../subCategories/subCategories.routes.js'
import { validation } from '../../utils/middleware/validation.js'
import { createCategorySchema, getCategoryByIdSchema } from './categories.validator.js'
import multer from 'multer'
import AppError from '../../utils/services/AppError.js'
import { uploadSingleFile } from '../../utils/middleware/fileUploads.js'


const categoryRouter = express.Router() /* create router */


//  http://localhost:3000/api/v1/category
categoryRouter.use('/:id/subcategory', subCategoryRouter) /* merge entre category et subcategory */

// multer

// end multer

// categoryRouter.get('/',categoryController.getAllCategory)
// categoryRouter.post('/',categoryController.createCategory)
categoryRouter.route('/')
.get(categoryController.getAllCategory)
.post(uploadSingleFile("category","image"), validation(createCategorySchema), categoryController.createCategory)


// categoryRouter.get('/:id',categoryController.getCategoryById)
// categoryRouter.put('/:id',categoryController.updateCategory)
// categoryRouter.delete('/:id',categoryController.deleteCategory)
categoryRouter.route('/:id')
.get(validation(getCategoryByIdSchema), categoryController.getCategoryById)
.put(categoryController.updateCategory)
.delete(categoryController.deleteCategory)

export default categoryRouter
