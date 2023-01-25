import { Comic } from "../models/Comic.js";
import defaultResponse from "../config/response.js";
import { Category } from "../models/Category.js";

const controller = {
    read: async (req, res, next) => {
        console.log(req.query)

        let queriesToFilter = {}
        let ordering = {}
        let pagination = {
            page:1 ,
            limit: 34 
        }
        if(req.query.title){
            queriesToFilter.title = { "$regex": req.query.title, $options: "i" };
        }
        if (req.query.category_id){
            queriesToFilter.category_id = req.query.category_id.split(",")
        }
        if (req.query.sort){
            ordering = {title: req.query.sort}
        }
        if (req.query.page) {
			pagination.page = req.query.page;
		}
		if (req.query.limit) {
			pagination.limit = req.query.limit;
		}
    try {
        let all = await Comic.find(queriesToFilter).populate("category_id")
        .sort(ordering)
        .skip( pagination.page > 0 ? (pagination.page - 1) * pagination.limit : 0)
        .limit(pagination.limit)
            
        if (all) {
            req.body.success = true;
            req.body.sc = 200;
            req.body.data = all;
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
