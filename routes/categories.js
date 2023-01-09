import controller from '../controllers/categories.controller.js'
const { create,read } = controller
import passport from '../config/passport.js'
import express from 'express'
let router = express.Router()
import isAdmin from '../middlewares/isAdmin.js'

router.post('/',passport.authenticate('jwt', { session:false }),isAdmin,create)
//passport inyecta el objeto user al req
//luego para verirficar que SOLO los administrador puedan crear una categoria
    //debo configurar un middleware
router.get('/',read)


export default router