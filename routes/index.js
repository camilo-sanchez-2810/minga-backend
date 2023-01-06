import chapters from './chapter.js'
import users from './users.js'
import authors from './authors.js'
import comics from './comics.js'
import express from 'express'
let router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('minga server ready')
})

router.use('/auth',users)
router.use('/comics', comics)
router.use('/authors', authors)
router.use('/chapters',chapters)


export default router