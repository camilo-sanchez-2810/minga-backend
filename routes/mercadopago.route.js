import express from "express";
const router = express.Router();
import passport from "passport";
//import PaymentController from "../controllers/mercadoPago.controller.js";
import crearOrden from "../controllers/mercadoPago.controller.js";




router.post("/",passport.authenticate('jwt', {session: false}), crearOrden);

export default router;
