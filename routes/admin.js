import passport from "passport";
import express from "express";
import validator from '../middlewares/validator.js'
import isAdmin from "../middlewares/isAdmin.js";
import AdminUserController from "../controllers/admin.user.controller.js";

const {updateRoleAuthor, updateRoleCompany } = AdminUserController

let router = express.Router()

router.put('/company/:id', passport.authenticate('jwt', {session: false}), isAdmin , updateRoleCompany)
router.put('/author/:id', passport.authenticate('jwt', {session: false}), isAdmin , updateRoleAuthor)

export default router