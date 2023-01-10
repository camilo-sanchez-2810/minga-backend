import controller from "../controllers/comics.controller.js"
import schema from '../schemas/NewComic.js'
import validator from '../middlewares/validator.js'
import titleExists from '../middlewares/titleCompare.js'
const { create } = controller
import express from "express"
import all from "../controllers/comic.all.controller.js"

const { read } = all
let router = express.Router()


router.get('/',read)
router.post('/',validator(schema), titleExists, create)

export default router