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
            let likes = {name : "like"}
            let dislikes = {name: "dislike"}
            let reacted = {}
            if (req.query.comic_id){
                likes.comic_id = req.query.comic_id
                dislikes.comic_id = req.query.comic_id
            }
            //if(req.query.user_id){
              //  reactionToFilter.user_id = req.query.user_id  
                //}
        
        try{
            let allLikes = await Reaction.find(likes) //aca busco todos los likes
            allLikes = allLikes.map(like => String (like.user_id))
            let allDislikes = await Reaction.find(dislikes) //aca busco todos los dislikes
            allDislikes = allDislikes.map(dislike => String(dislike.user_id))
            let reactions = {
                likes : allLikes.length, 
                dislikes : allDislikes.length
            }
            if (allLikes.includes(req.query.user_id)){
                reacted.likes = true
                }else{
                    reacted.likes = false
                }
                if (allDislikes.includes(req.query.user_id)){
                    reacted.dislikes = true
                    }else{
                        reacted.dislikes = false
                    }
                req.body.success = true
                req.body.sc = 200
                req.body.data = {reactions,reacted}
                return defaultResponse(req,res)
        } catch(error){
            next (error)
        }
    }
}


export default reactionControl