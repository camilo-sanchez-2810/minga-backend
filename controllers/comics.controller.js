import { Comic } from '../models/Comic.js'
import defaultResponse from '../config/response.js'
import { Category } from '../models/Category.js'
import { Author } from '../models/Author.js'


//.populate("categories")
let comicControl ={
    create: async(req, res, next)=> {
        try {
            const author = await Author.findOne({user_id: req.user.id})
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
        let query = {}
        if(req.body.author_id) {
            query["author_id"] = req.body.author_id
        }
        if(req.body.company_id) {
            query["company_id"] = req.body.company_id
        }
        try {
            const comics = await Comic.find(query)
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
    },
    update: async(req, res, next) => {
        try {
            await Comic.findByIdAndUpdate(req.params.id, req.body)
            req.body.success = true
            req.body.sc = 200
            req.body.data = 'comic edited'
            return defaultResponse(req,res)
        } catch (error) {
            next(error)
        }
    },
    delete_comic: async(req, res, next) => {
        console.log(req.params)
        try {
            await Comic.findByIdAndDelete(req.params.id)
            req.body.success = true
            req.body.sc = 200
            req.body.data = 'comic deleted'
            return defaultResponse(req,res)
        } catch (error) {
            next(error)
        }
    }
}

export default comicControl
