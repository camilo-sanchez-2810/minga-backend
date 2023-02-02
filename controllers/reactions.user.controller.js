import { Reaction } from '../models/Reaction.js'
import defaultResponse from '../config/response.js'
import {Comic} from '../models/Comic.js'
import { Category } from '../models/Category.js'

let controller ={
    deleteLike: async(req, res, next)=> {
        try {
            let data = {
                name: "like",
                comic_id : req.body.comic_id,
                user_id : req.user.id
            }
			const reaction = await Reaction.findOne(data)
            //console.log(reaction)
			if(reaction){
				await Reaction.findOneAndDelete(data)
                req.body.data = 'reaction eliminate'
            }
			req.body.success = true
            req.body.sc = 200
            return defaultResponse(req,res)
        }catch(error){
            next(error)
        }
    }, 
    
    read_user: async(req,res,next)=>{
      //console.log(req.query)
            let query = {                
                user_id: req.user.id,
                name: "like",                
            }
            let queryOfPopulate = {
                // category_id:req.query.category_id,
                // title:req.query.title
            }
             if (req.query.category_id){
                queryOfPopulate.category_id = req.query.category_id.split(",")
             }
              if(req.query.title){
                queryOfPopulate.title = { "$regex": req.query.title, $options: "i" };
             }

        try{
            
            let allLikes = await Reaction.find({user_id:query.user_id,name:query.name},"-user_id -createdAt -updatedAt -__v" )
            .populate({path:"comic_id",match: queryOfPopulate, populate: {path: "category_id", select: "name"},select:["title","photo","category_id"]})
            allLikes = allLikes.filter(like => like.comic_id !== null)
            //console.log(allLikes)
                req.body.success = true
                req.body.sc = 200
                req.body.data = allLikes
                return defaultResponse(req,res)
        } catch(error){
            next (error)
        }
    }
}


export default controller
