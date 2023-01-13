import { Reaction } from '../models/reaction.js'
import defaultResponse from '../config/response.js'

let reactionControl ={
    create: async(req, res, next)=> {
        try {
			const reaction = await Reaction.findOne(req.body)
            console.log(reaction)
			if(reaction){
				await Reaction.findOneAndDelete(req.body)
            }
			else{
				await Reaction.create(req.body)
			}
			req.body.success = true
            req.body.sc = 200
            req.body.data = 'reaction created'
            return defaultResponse(req,res)
        }catch(error){
            next(error)
        }
    }
}

export default reactionControl