import express from 'express'
const router = express.Router()
import schema from '../schemas/author.schema.js'
import validator from '../middlewares/validator.js'
import controller from '../controllers/author.controller.js'
const { create } = controller

router.post('/', validator(schema), create)

export default router