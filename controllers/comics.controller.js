import { Comic } from '../models/Comic.js'
import defaultResponse from '../config/response.js'
import { Category } from '../models/Category.js'
import { Author } from '../models/Author.js'


//.populate("categories")
let comicControl ={
    create: async(req, res, next)=> {
        try {
            const [author] = await Author.find({user_id: req.user.id})
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
    my_comics: async(req, res, next) => {
        const user_id = req.user.id
        try {
            const author = await Author.findOne({user_id}, '_id')
            const comics = await Comic.find({author_id: author._id})
            if(comics){
                req.body.success = true
                req.body.sc = 200
                req.body.data = comics
                return defaultResponse(req,res)
            }
            req.body.success = false
            req.body.sc = 404
            req.body.data = 'comics not found'
            return defaultResponse(req,res)
        } catch (error) {
            return next(error)
        }
    }
}

export default comicControl
