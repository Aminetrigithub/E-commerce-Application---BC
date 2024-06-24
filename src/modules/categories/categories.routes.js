import express from 'express'
import * as categoryController from './categories.controller.js'
import subCategoryRouter from '../subCategories/subCategories.routes.js'


const categoryRouter = express.Router()

// categoryRouter.get('/',categoryController.getAllCategory)
// categoryRouter.post('/',categoryController.createCategory)

//  http://localhost:3000/api/v1/category
categoryRouter.use('/:id/subcategory', subCategoryRouter)
categoryRouter.route('/')
.get(categoryController.getAllCategory)
.post(categoryController.createCategory)

// categoryRouter.get('/:id',categoryController.getCategoryById)
// categoryRouter.put('/:id',categoryController.updateCategory)
// categoryRouter.delete('/:id',categoryController.deleteCategory)

categoryRouter.route('/:id')
.get(categoryController.getAllCategory)
.put(categoryController.updateCategory)
.delete(categoryController.deleteCategory)

export default categoryRouter
