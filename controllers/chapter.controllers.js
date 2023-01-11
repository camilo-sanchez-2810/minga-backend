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
	get_pages: async (req, res) => {
		const { id } = req.params;
		try {
			const chapter = await Chapter.findById(id,"title pages order");
			chapter.pages = chapter.pages.sort((firstElement, secondElement) =>
				firstElement.localeCompare(secondElement)
			)
			if (chapter) {
				req.body.success = true;
				req.body.sc = 200;
				req.body.data = chapter;
				return defaultResponse(req, res);
			} else {
				req.body.success = false;
				req.body.sc = 404;
				req.body.data = "chapter not found";
				return defaultResponse(req, res);
			}
		} catch (error) {
			req.body.success = false;
			req.body.sc = 500;
			req.body.data = "error";
			return defaultResponse(req, res);
		}
	},
};
export default controller;
