import { Comic } from '../models/Comic.js'
import defaultResponse from '../config/response.js'

let comicControl ={
    create: async(req, res)=> {
        req.body.active = true
        try {
            await Comic.create(req.body)
            req.body.success = true
            req.body.sc = 201
            req.body.data = 'comic created'

            // const {author_id, company_id, title, photo, description, category } = req.body
            // await Comic.create({author_id, company_id, title, photo, description, category})
            // req.body.success = true
            // req.body.sc = 201
            // req.body.data = 'Comic created'
            return defaultResponse(req,res)
        }catch(error){
            next(error)
        }
    }
}

export default comicControl
