import { Reaction } from '../models/Reaction.js'
import defaultResponse from '../config/response.js'

let reactionControl ={
    create: async(req, res, next)=> {
        try {
            let data = {
                name : req.body.name,
                comic_id : req.body.comic_id,
                user_id : req.user.id
            }
			const reaction = await Reaction.findOne(data)
            //console.log(reaction)
			if(reaction){
				await Reaction.findOneAndDelete(data)
                req.body.data = 'reaction eliminate'
            }
			else{
				await Reaction.create(data)
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
            let likes = {name : "like"}
            let dislikes = {name: "dislike"}
            let reacted = {}
            let user_id = req.user.id.toString()
            if (req.query.comic_id){
                likes.comic_id = req.query.comic_id
                dislikes.comic_id = req.query.comic_id
            }
            //if(req.query.user_id){
            //  reactionToFilter.user_id = req.query.user_id  
            //}
        try{
            let allLikes = await Reaction.find(likes) 
            let allDislikes = await Reaction.find(dislikes) 
            allLikes = allLikes.map(like =>  (like.user_id).toString())
            allDislikes = allDislikes.map(dislike => (dislike.user_id).toString())
            let reactions = {
                likes : allLikes.length, 
                dislikes : allDislikes.length
            }
            if (allLikes.includes(user_id)){
                reacted.likes = true
                }else{
                    reacted.like = false
                }
                if (allDislikes.includes(user_id)){
                    reacted.dislike = true
                    }else{
                        reacted.dislikes = false
                    }
                    console.log(allLikes)
                    //console.log(allDislikes)
                    console.log(user_id)
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
