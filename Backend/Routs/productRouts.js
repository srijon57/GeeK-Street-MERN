import express from 'express'
import { createProductController } from '../Controllers/productController'

const router = express.Router()

//routs
router.post('/create-product', requiredSignIn, isAdmin, createProductController)

export default router