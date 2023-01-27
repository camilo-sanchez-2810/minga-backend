import axios from "axios";

import mercadopago from "mercadopago";

const crearOrden = async (req, res) => {

    const response = axios.get('https://api.mercadopago.com/checkout/preferences', req.body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.MERCADOPAGO_KEY}`
        }
    })



    const produ = req.body
    console.log(produ)

    const preference = {
        items: [
            {
               
                title: "Donacion",
                quantity: 1,
                currency_id: "ARS",
                unit_price: produ.unit_price
            }, 

          

        ],
        back_urls: {
            success: "http://localhost:3000/succes-payment",
            pending: "http://localhost:3000",
            failure: "http://localhost:3000",
          },
          auto_return: "approved",
    

    }; 

    mercadopago.preferences.create(preference)
        .then(function (response) {

            if (req.body.unit_price) {
                return res.status(response.status).json({
                    response
                /*     init_point: response.body.init_point, 
                    id: response.body.id,  */
                    /*  status: response.body.status, */
                })
            } else {
                console.log("esto seria los otros items")
            } 
        })
        .catch(function (error) {
            console.log(error)
            return res.status(500).json({
                message: "Failed to creat payment"
            })
        })
}

export default crearOrden