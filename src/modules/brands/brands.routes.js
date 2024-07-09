import express from 'express'
import * as brandController from './brands.controller.js'
import { validation } from '../../utils/middleware/validation.js'
import { createBrandSchema, deleteBrandSchema, updateBrandSchema } from './brand.validation.js'


const brandRouter = express.Router()


brandRouter.route('/')
.get(brandController.getAllBrand)
.post(validation(createBrandSchema), brandController.createBrand)


brandRouter.route('/:id')
.get(brandController.getBrandById)
.put(validation(updateBrandSchema),brandController.updateBrand)
.delete(validation(deleteBrandSchema),brandController.deleteBrand)

export default brandRouter
