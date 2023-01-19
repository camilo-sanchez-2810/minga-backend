import { Comic } from "../models/Comic.js";
import defaultResponse from "../config/response.js";


const controller = {
    get_comic: async (req, res) => {
        const {id} = req.params;
        
        try {
            let one = await Comic.findById(id, " -company_id -__v -createdAt -updatedAt")
                .populate({path: "author_id", select: "name"})
                .populate({path: "category_id", select: "name"})
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
        }  catch (error) {
			req.body.success = false;
			req.body.sc = 500;
            req.body.data = "error";
			return defaultResponse(req, res);
        }
    }
    }
    
    export default controller    