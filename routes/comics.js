import controller from "../controllers/comics.controller.js"
import schema from '../schemas/NewComic.js'
import validator from '../middlewares/validator.js'
import titleExists from '../middlewares/titleCompare.js'
import getComic from '../controllers/comic.one.controller.js'
const { read } = getComic
const { create } = controller
import express from "express"
let router = express.Router()

router.post('/',validator(schema), titleExists, create)
router.get('/:id', read)

export default router