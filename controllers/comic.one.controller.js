import { Comic } from "../models/Comic.js";
import defaultResponse from "../config/response.js";


const controller = {
    read: async (req, res, next) => {
        const id = req.path.replace('/', '')
        
        try {
            let one = await Comic.findById(id)
            if (one) {
                req.body.success = true;
                req.body.sc = 200;
                req.body.data = one;
                return defaultResponse(req, res);
            } else {
                req.body.success = false;
                req.body.sc = 404;
                req.body.data = "not found";
                return defaultResponse(req, res);
            }
        } catch (error) {
            next(error);
        }
    }
    }
    
    export default controller    