import controller from '../controllers/chapter.controllers.js'
import schema from '../schemas/chapter.schema.js'
import validator from '../middlewares/validator.js'
import passport from '../config/passport.js'
const { create, get_pages, get_chapters } = controller
import express from 'express'
import orderExists from '../middlewares/chapterExist.js'
let router = express.Router()

router.post('/',passport.authenticate('jwt', { session:false }),validator(schema),orderExists,create)
router.get('/:id', get_pages)

export default router