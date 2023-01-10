import { Comic } from '../models/Comic.js'
import defaultResponse from '../config/response.js'

async function titleExists(req,res,next) {
    let { title } = req.body 
    let comic = await Comic.findOne({ title })
    if (comic) {
        req.body.success = false
        req.body.sc = 400
        req.body.data = 'comic title exists'
        return defaultResponse(req,res)
    }
    return next()
}

export default titleExists