import controller from "../controllers/company.controller.js"
import Schema from "../schemas/company.schema.js"
import express from "express"
import passport from "passport"
import validator from "../middlewares/validator.js"
import isCompany from "../middlewares/isCompany.js"
import AdminUserController from "../controllers/admin.user.controller.js"
import isAdmin from "../middlewares/isAdmin.js"

const router = express.Router()

const { update, get_company } = controller
const {getCompanies} = AdminUserController

router.get("/:id", passport.authenticate("jwt", { session: false }), get_company)
router.put("/:me",passport.authenticate('jwt', {session: false}), validator(Schema), isCompany, update)
router.get('/',passport.authenticate('jwt',{session: false}), isAdmin, getCompanies)

export default router