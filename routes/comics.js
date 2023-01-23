import controller from "../controllers/comics.controller.js"
const { create } = controller
import schema from '../schemas/NewComic.js'
import validator from '../middlewares/validator.js'
import titleExists from '../middlewares/titleCompare.js'
import controller_one from '../controllers/comic.one.controller.js'
const { get_comic } = controller_one

import express from "express"
import all from "../controllers/comic.all.controller.js"

const { read } = all
let router = express.Router()


router.get('/',read)
router.post('/',validator(schema), titleExists, create)
router.get('/:id', get_comic)



export default router