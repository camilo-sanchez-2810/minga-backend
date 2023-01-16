import { Reaction } from '../models/reaction.js'
import defaultResponse from '../config/response.js'

let reactionControl ={
    create: async(req, res, next)=> {
        try {
			const reaction = await Reaction.findOne(req.body)
            console.log(reaction)
			if(reaction){
				await Reaction.findOneAndDelete(req.body)
                req.body.data = 'reaction eliminate'
            }
			else{
				await Reaction.create(req.body)
                req.body.data = 'reaction created'
            }
			req.body.success = true
            req.body.sc = 200
            return defaultResponse(req,res)
        }catch(error){
            next(error)
        }
    },
    read: async(req,res,next)=>{
        console.log(req.query)
            let reactionToFilter = {}

            if (req.query.comic_id){
                reactionToFilter.comic_id = req.query.comic_id
            }
            if(req.query.user_id){
                reactionToFilter.user_id = req.query.user_id
            }
        
        try{
            let all = await Reaction.find(reactionToFilter)
            if (all){
                req.body.success = true
                req.body.sc = 200
                req.body.data = all
                return defaultResponse(req,res)
            }else{
                req.body.success = false
                req.body.sc = 404
                req.body.data = "not found"
                return defaultResponse(req,res)
            }
        } catch(error){
            next (error)
        }
    }
}


export default reactionControl