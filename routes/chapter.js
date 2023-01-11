import controller from '../controllers/chapter.controllers.js'
import schema from '../schemas/chapter.schema.js'
import validator from '../middlewares/validator.js'
const { create, get_pages, view_caps } = controller
import express from 'express'
import orderExists from '../middlewares/chapterExist.js'
let router = express.Router()

router.post('/',validator(schema),orderExists,create)
router.get('/:id', get_pages)
router.get('/', view_caps)

export default router