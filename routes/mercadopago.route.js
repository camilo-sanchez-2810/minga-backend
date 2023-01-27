import express from "express";
const router = express.Router();
import passport from "passport";
//import PaymentController from "../controllers/mercadoPago.controller.js";
import crearOrden from "../controllers/mercadoPago.controller.js";
import validator from "../middlewares/validator.js";



router.post("/", crearOrden);

export default router;
