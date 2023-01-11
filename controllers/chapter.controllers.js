import {Chapter} from '../models/Chapter.js'
import defaultResponse from '../config/response.js'

const controller = {
    create: async(req, res)=>{
        try{
            const {comic_id,title, pages,order} = req.body
            await Chapter.create({comic_id,title, pages,order}) //el usuario no envia order
            req.body.success = true;
			req.body.sc = 201;
			req.body.data = 'chapter created';
			return defaultResponse(req, res);
        } catch(error){
            req.body.success = false;
			req.body.sc = 500;
			req.body.data = 'error';
			return defaultResponse(req, res);
        }
    },
    view_caps: async (req, res, next) => {
		console.log(req.query);
		let consultasParaFiltrar = {};
		let ordenamiento = {};
		let paginacion = {
			page: 1,
			limit: 5, 
		};
		if (req.query.comic_id) {
			consultasParaFiltrar = consultasParaFiltrar.comic_id
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
			let all = await Chapter.find(consultasParaFiltrar, "-pages -__v -createdAt -updatedAt")
				.sort(ordenamiento)
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
    get_pages: async (req, res) => {
        const id = req.path.replace('/','')
        try {
            const chapter = Chapter.findById(id)
            if (chapter) {
                req.body.success = true;
                req.body.sc = 200;
                req.body.data = chapter;
                return defaultResponse(req, res);
            } else {
                req.body.success = false;
                req.body.sc = 404;
                req.body.data = 'chapter not found';
                return defaultResponse(req, res);
            }
        } catch(error) {
            req.body.success = false;
			req.body.sc = 500;
			req.body.data = 'error';
			return defaultResponse(req, res);
        }
    }
}
export default controller