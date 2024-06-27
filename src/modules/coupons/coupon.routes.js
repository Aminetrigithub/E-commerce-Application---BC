import express from 'express'
import * as couponController from './coupon.controller.js'


const couponRouter = express.Router()

couponRouter.route('/')
.get(couponController.getAllCoupon)
.post(couponController.createCoupon)


couponRouter.route('/:id')
.get(couponController.getAllCoupon)
.put(couponController.updateCoupon)
.delete(couponController.deleteCoupon)

export default couponRouter
