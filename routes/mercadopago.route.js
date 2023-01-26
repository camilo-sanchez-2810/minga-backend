import express from "express";
const router = express.Router();
import passport from "passport";
//import PaymentController from "../controllers/mercadoPago.controller.js";
import Preferences from "../models/mercadopado.model.js";
import validator from "../middlewares/validator.js";

const { create } = Preferences;

router.post("/", create);

export default router;
