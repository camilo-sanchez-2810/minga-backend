import { Comic } from '../models/Comic.js'
import defaultResponse from '../config/response.js'
import { Category } from '../models/Category.js'


//.populate("categories")
let comicControl ={
    create: async(req, res)=> {
        req.body.active = true
        try {
            await Comic.create(req.body)
            req.body.success = true
            req.body.sc = 201
            req.body.data = 'comic created'

            
            return defaultResponse(req,res)
        }catch(error){
            next(error)
        }
    },
    
}

export default comicControl
