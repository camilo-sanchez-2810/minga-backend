import { Reaction } from '../models/reaction.js'
import defaultResponse from '../config/response.js'

let reactionControl ={
    create: async(req, res)=> {
        console.log(req.body)
        try {
            const a = await Reaction.create(req.body)
            req.body.success = true
            req.body.sc = 201
            req.body.data = 'reaction created'
            return defaultResponse(req,res)
        }catch(error){
            next(error)
        }
    }
}

export default reactionControl