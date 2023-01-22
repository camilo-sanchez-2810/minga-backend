import { Reaction } from '../models/reaction.js'
import defaultResponse from '../config/response.js'
import {Comic} from '../models/Comic.js'


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
      console.log(req.query)
            let query = {
                user_id: req.user.id,
                name: "like",
                
            }
            // if (req.query.category_id){
            //     query.category_id = req.query.category_id.split(",")
            // }

        try{
            let allLikes = await Reaction.find(query,"comic_id").populate("comic_id",["title","photo","category_id"])
            .populate({path:"comic_id",populate:"category_id"})
            console.log(allLikes)
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