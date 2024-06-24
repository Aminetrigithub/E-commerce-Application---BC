import express from 'express'
import * as brandController from './brands.controller.js'


const brandRouter = express.Router()


brandRouter.route('/')
.get(brandController.getAllBrand)
.post(brandController.createBrand)


brandRouter.route('/:id')
.get(brandController.getBrandById)
.put(brandController.updateBrand)
.delete(brandController.deleteBrand)

export default brandRouter
