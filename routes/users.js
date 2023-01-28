import express from 'express'
let router = express.Router()
import schema from '../schemas/signup.schema.js'
import validator from '../middlewares/validator.js'
import accountExistsSignUp from '../middlewares/accountExistsSignUp.js'
import accountExistsSignIn from '../middlewares/accountExistsSignIn.js'
import accountHasBeenVerified from './../middlewares/accountHasBeenVerified.js'
import mustSignIn from '../middlewares/mustSignIn.js'
import controller from '../controllers/users.controller.js'
const { signup,signin,signintoken,signout,read,updateRoleCompany,updateRoleAuthor } = controller
import passport from '../config/passport.js'
import Schema from '../schemas/company.schema.js'


router.post('/signup',accountExistsSignUp,validator(schema),signup)
router.post('/signin',accountExistsSignIn,accountHasBeenVerified,signin)
router.post('/token',passport.authenticate('jwt', { session:false }),mustSignIn,signintoken)
router.put('/signout',passport.authenticate('jwt', { session:false }),signout)
router.get('/',read)
router.put('/role/company', validator(Schema), updateRoleCompany)
router.put('/role/author', updateRoleAuthor)

export default router