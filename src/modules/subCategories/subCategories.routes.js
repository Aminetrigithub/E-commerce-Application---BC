import express from 'express'
import * as subCategoryController from './subCategories.controller.js'

const subCategoryRouter = express.Router({mergeParams:true})


subCategoryRouter.route('/')
.get(subCategoryController.getAllSubCategory)
.post(subCategoryController.createSubCategory)

subCategoryRouter.route('/:id')
.get(subCategoryController.getAllSubCategory)
.put(subCategoryController.updateSubCategory)
.delete(subCategoryController.deleteSubCategory)

export default subCategoryRouter

// http://localhost:3000/api/v1/category...categories routes

// http://localhost:3000/api/v1/category/6658b32103e271d6806045c9/subCategory --> subcategory
// http://localhost:3000/api/v1/subCategory --> subcategory
// ==> bech ysir merge bin les deux derniers lien

