//1ro obtener todos los comics
//2do crear los filtros
import { Comic } from "../models/Comic.js";
import defaultResponse from "../config/response.js";


const controller = {
    read: async (req, res, next) => {
        //REQ ES UN OBJETO CON TOOOOOOODOS LOS REQUERIMIENTOS PARA PODER REALIZAR LA OPERACION
		//REQ.BODY
		//REQ.PARAMS
		//REQ.QUERY
        console.log(req.query)
        let consultasParaFiltrar = {}
        let ordenamiento = {}
        if(req.query.title){
            consultasParaFiltrar.title = req.query.title.split(',')
            consultasParaFiltrar.title = { "$regex": req.query.title, $options: "i" };
        }

        
        if (req.query.category_id){
            consultasParaFiltrar.category_id = req.query.category_id

        }
        if (req.query.sort){
            ordenamiento = {title: "-1"}
        }
        


    try {
        let all = await Comic.find(consultasParaFiltrar)
            
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
