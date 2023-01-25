import express from 'express'
const router = express.Router()
import schema from '../schemas/author.schema.js'
import validator from '../middlewares/validator.js'
import controller from '../controllers/author.controller.js'
import passport from 'passport'
import Schema from '../schemas/author.update.schema.js'
import isAuthor from '../middlewares/isAuthor.js'
const { create, update, get_author } = controller

router.post('/', passport.authenticate('jwt', { session: false }),validator(schema), create)
router.put('/me', passport.authenticate('jwt', {session: false}), validator(Schema), isAuthor, update)

export default router