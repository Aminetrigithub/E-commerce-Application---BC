import express from 'express'
import * as subCategoryController from './subCategories.controller.js'

const subCategoryRouter = express.Router({mergeParams:true})

// categoryRouter.get('/',categoryController.getAllCategory)
// categoryRouter.post('/',categoryController.createCategory)

subCategoryRouter.route('/')
.get(subCategoryController.getAllSubCategory)
.post(subCategoryController.createSubCategory)

// categoryRouter.get('/:id',categoryController.getCategoryById)
// categoryRouter.put('/:id',categoryController.updateCategory)
// categoryRouter.delete('/:id',categoryController.deleteCategory)

subCategoryRouter.route('/:id')
.get(subCategoryController.getAllSubCategory)
.put(subCategoryController.updateSubCategory)
.delete(subCategoryController.deleteSubCategory)

export default subCategoryRouter

// http://localhost:3000/api/v1/category...categories routes
// http://localhost:3000/api/v1/category/6658b32103e271d6806045c9/subCategory --> subcategorie

// http://localhost:3000/api/v1/subCategory --> subcategorie
// 

