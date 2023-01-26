import mercadopago from "mercadopago";
import axios from "axios";

const preference = {
    items: [
        {
            title: "Donation 1.000",
            quantity: 1,
            currency_id: "ARS",
            unit_price: 1000,
        },
        {
            title: "Donation 5.000",
            quantity: 1,
            currency_id: "ARS",
            unit_price: 5000,
        },
        {
            title: "Donation 10.000",
            quantity: 1,
            currency_id: "ARS",
            unit_price: 10000,
        },
    ],
} 

const paymentController = {
    create: async(req,res) => {
        try{
            console.log(req.query)
/*             console.log(req.body) */
            mercadopago.preferences
            const response = axios.get('https://api.mercadopago.com/checkout/preferences', req.body, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`}
            })
            console.log(response)
            res.status(201).json({
                success: true,
                response: "payment successfully"
            })
        }
        catch(error){
            console.log(error)
        }
    },
    async create(req, res){
        try{
            preference.items.map(item => {
                if (item.unit_price === req.body.unit_price) {
                    console.log(item)
                }
            })
            
        }catch(error){
            console.log(error)
        }
    }
} 

export default paymentController