import mercadopago from "mercadopago";

const tokenMercadopago = mercadopago.configure({
  access_token: process.env.MERCADOPAGO_KEY,
});
export default tokenMercadopago;
