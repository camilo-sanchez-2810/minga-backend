
import validator from '../middlewares/validator.js'
import schema from '../schemas/reactions.schema.js'
import reactionExists from '../middlewares/isMiddlewaresExist.js'
import express from "express"
let router = express.Router()
import reactionControl from '../controllers/reactions.controller.js'
import passport from 'passport'
let { create, read } = reactionControl


router.post('/',passport.authenticate('jwt', { session:false }), reactionExists, create)
router.get('/',passport.authenticate('jwt', { session:false }),read)
//router.get(`/`,validator(schema),reactionExists)

export default router