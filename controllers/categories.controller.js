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
		//REQ ES UN OBJETO CON TOOOOOOODOS LOS REQUERIMIENTOS PARA PODER REALIZAR LA OPERACION
		//REQ.BODY
		//REQ.PARAMS
		//REQ.QUERY
		console.log(req.query); //para ver todas las consultas que vienen en la peticion
		let consultasParaFiltrar = {}; //se pasa adentro del metodo que busca
		let ordenamiento = {}; //se pasa adentro del metodo que ordena
		let paginacion = {
			page: 1,
			limit: 4, //predefinimos que si el cliente NO ENVIA esta query, por defecto me pagine de a 4 documento
			//se utiliza en skip y limit para poder paginar
		};
		if (req.query.name) {
			//consultasParaFiltrar.name = req.query.name.split(',') //para "cortar" un array de datos
			consultasParaFiltrar.name = { $regex: req.query.name, $options: "i" }; //expresion para incluir "palabras" a la busqueda
		}
		if (req.query.ranking) {
			consultasParaFiltrar.ranking = Number(req.query.ranking);
		}
		if (req.query.sort) {
			ordenamiento = { name: req.query.sort };
			//sort admite dos formas de order:
			//con 1 y -1
			//con asc y desc
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
				//skip es un método que corta los primeros datos (según el valor que le pase)
				.limit(paginacion.limit);
			//limit me recorta el array de documentos en partecitas iguales
			//(a través de req.quer.limit, el cliente me avisa de que longitud es cada una de esas partes)
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
