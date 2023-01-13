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
		console.log(req.query); 
		let consultasParaFiltrar = {};
		let ordenamiento = {}; 
		let paginacion = {
			page: 1,
			limit: 4, 
		};
		if (req.query.name) {
			consultasParaFiltrar.name = { $regex: req.query.name, $options: "i" }; 
		}
		if (req.query.ranking) {
			consultasParaFiltrar.ranking = Number(req.query.ranking);
		}
		if (req.query.sort) {
			ordenamiento = { name: req.query.sort };
		}
		if (req.query.page) {
			paginacion.page = req.query.page;
		}
		if (req.query.limit) {
			paginacion.limit = req.query.limit;
		}
		try {
			let all = await Category.find(consultasParaFiltrar)
				.sort(ordenamiento)
				.skip(
					paginacion.page > 0 ? (paginacion.page - 1) * paginacion.limit : 0
				)
				.limit(paginacion.limit);
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
