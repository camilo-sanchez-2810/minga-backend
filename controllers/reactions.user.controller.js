import { Reaction } from '../models/reaction.js'
import defaultResponse from '../config/response.js'
import {Comic} from '../models/Comic.js'

let controller ={
    
    read_user: async(req,res,next)=>{

        //console.log(req.query)
            let query = {
                user_id: req.user.id.toString(),
                name: "like"
            }
            let reacted = {}
        try{
            let allLikes = await Reaction.find(query,"comic_id").populate("comic_id",["title","photo","category_id"])
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