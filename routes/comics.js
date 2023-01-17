import controller from "../controllers/comics.controller.js"
const { create } = controller
import schema from '../schemas/NewComic.js'
import validator from '../middlewares/validator.js'
import titleExists from '../middlewares/titleCompare.js'
import getComic from '../controllers/comic.one.controller.js'
const { get_comic } = getComic

import express from "express"
let router = express.Router()

router.post('/',validator(schema), titleExists, create)
router.get('/:id', get_comic)



export default router