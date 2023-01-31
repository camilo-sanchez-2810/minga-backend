import express from 'express'
const router = express.Router()
import schema from '../schemas/author.schema.js'
import validator from '../middlewares/validator.js'
import controller from '../controllers/author.controller.js'
import passport from 'passport'
import Schema from '../schemas/author.update.schema.js'
import isAuthor from '../middlewares/isAuthor.js'
import AdminUserController from '../controllers/admin.user.controller.js'
import isAdmin from '../middlewares/isAdmin.js'

const { create, update, get_author } = controller
const {getAuthor} = AdminUserController

router.post('/', passport.authenticate('jwt', { session: false }),validator(schema), create)
router.put('/me', passport.authenticate('jwt', {session: false}), validator(Schema), isAuthor, update)
router.get('/', passport.authenticate('jwt', {session:false}), isAdmin, getAuthor)


export default router