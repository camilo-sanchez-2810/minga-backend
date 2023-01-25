import { Chapter } from "../models/Chapter.js";
import defaultResponse from "../config/response.js";

const controller = {
	create: async (req, res) => {
		try {
			const { comic_id, title, pages, order } = req.body;
			await Chapter.create({ comic_id, title, pages, order }); //el usuario no envia order
			req.body.success = true;
			req.body.sc = 201;
			req.body.data = "chapter created";
			return defaultResponse(req, res);
		} catch (error) {
			req.body.success = false;
			req.body.sc = 500;
			req.body.data = "error";
			return defaultResponse(req, res);
		}
	},
	get_pages: async (req, res, next) => {
		const { id } = req.params;
		try {
			const chapter = await Chapter.findById(id, "title pages order");
			chapter.pages = chapter.pages.sort((firstElement, secondElement) =>
				firstElement.localeCompare(secondElement)
			);
			if (chapter) {
				req.body.success = true;
				req.body.sc = 200;
				req.body.data = chapter;
				defaultResponse(req, res)
			}
		} catch (error) {
			next(error);
		}
	},
	get_chapters: async (req, res, next) => {
		let consultasParaFiltrar = {};
		let ordenamiento = {};
		let paginacion = {
			page: 1,
			limit: 5, 
		};
		if (req.query.comic_id) {
			consultasParaFiltrar.comic_id = req.query.comic_id
		}
		if (req.query.page) {
			paginacion.page = req.query.page;
		}
		if (req.query.limit) {
			paginacion.limit = req.query.limit;
		}
		if (req.query.sort) {
			ordenamiento = { order: req.query.sort };/////
		}
		try {
			let all = await Chapter.find(consultasParaFiltrar, "-pages -__v -createdAt -updatedAt")
				.sort(ordenamiento)
				.skip(paginacion.page > 0 ? (paginacion.page - 1) * paginacion.limit : 0)
				.limit(paginacion.limit);
			res.status(201).json({
				success:true,
				response:all,
			});
		
		} catch (error) {
			next(error);
		}
	},
	update: async (req, res) => {
			try{
				const { id } = req.params
				let chapter = await Chapter.findOneAndUpdate(
					{_id : id},
					req.body,
					{ new: true }
				)
				res.status(200).json({
					success: true,
					response: "updated",
					update_chapter : chapter
				})
			}catch(error){
				next (error)
			}
        },
	destroy: async(req,res)=>{
			try{
				const { id } = req.params
				await Chapter.findByIdAndDelete(id)
				res.status(200).json({
					succes: true,
					response: "deleted"
				})
			}catch(error){
				next (error)
			}
		}
	};
export default controller;
