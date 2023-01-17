import { Category } from "../models/Category.js";
import defaultResponse from "../config/response.js";

const controller = {
	create: async (req, res, next) => {
		try {
			await Category.create(req.body);
			req.body.success = true;
			req.body.sc = 201;
			req.body.data = "created";
			return defaultResponse(req, res);
		} catch (error) {
			next(error);
		}
	},

	read: async (req, res, next) => {

		try {
			let all = await Category.find()
				
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
	},
};

export default controller;
