import defaultResponse from '../config/response.js'
import { Reaction } from '../models/reaction.js'

async function reactionExists(req,res,next) {
    let { reaction } = req.body 
    let exist = await Reaction.findOne({ reaction })
    if (exist) {
        req.body.success = false
        req.body.sc = 400
        req.body.data = 'reactions exists'
        return defaultResponse(req,res)
    }
    return next()
}

export default reactionExists