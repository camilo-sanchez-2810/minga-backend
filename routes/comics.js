import controller from "../controllers/comics.controller.js"
const { create } = controller
import schema from '../schemas/NewComic.js'
import validator from '../middlewares/validator.js'
import isAuthorActive from '../middlewares/isAuthorActive.js'
import isAuthor from '../middlewares/isAuthor.js'
import titleExists from '../middlewares/titleCompare.js'
import getComic from '../controllers/comic.one.controller.js'
const { get_comic } = getComic

import express from "express"
import all from "../controllers/comic.all.controller.js"
import passport from "passport"

const { read } = all
let router = express.Router()


router.get('/',read)
router.post('/', passport.authenticate('jwt', { session: false }),validator(schema), isAuthor, isAuthorActive, titleExists, create)
router.get('/:id', get_comic)



export default router