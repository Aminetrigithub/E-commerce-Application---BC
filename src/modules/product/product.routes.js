import express from 'express'
import * as productController from './product.controller.js'


const productRouter = express.Router()

productRouter.route('/')
.get(productController.getAllProduct)
.post(productController.createProduct)


productRouter.route('/:id')
.get(productController.getAllProduct)
.put(productController.updateProduct)
.delete(productController.deleteProduct)

export default productRouter
