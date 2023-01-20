import controller from '../controllers/chapter.controllers.js'
import schema from '../schemas/chapter.schema.js'
import validator from '../middlewares/validator.js'
import passport from '../config/passport.js'
const { create, get_pages, get_chapters, update,destroy } = controller
import express from 'express'
import orderExists from '../middlewares/chapterExist.js'
let router = express.Router()

router.post('/',passport.authenticate('jwt', { session:false }),validator(schema),orderExists,create)
router.get('/:id', get_pages)
router.get('/', get_chapters)
router.put('/:id',update)
router.delete('/:id',destroy)

export default router