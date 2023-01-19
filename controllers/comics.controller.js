import { Comic } from '../models/Comic.js'
import defaultResponse from '../config/response.js'
import { Category } from '../models/Category.js'
import { Author } from '../models/Author.js'


//.populate("categories")
let comicControl ={
    create: async(req, res, next)=> {
        try {
            const author = await Author.find({user_id: req.user.id})
            req.body.author_id = author._id
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
