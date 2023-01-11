
import validator from '../middlewares/validator.js'
import schema from '../schemas/reactions.schema.js'
import reactionExists from '../middlewares/isMiddlewaresExist.js'
import express from "express"
let router = express.Router()
import reactionControl from '../controllers/reactions.controller.js'
let { create } = reactionControl


router.post('/',validator(schema), reactionExists, create)
//router.get(`/`,validator(schema),reactionExists)

export default router