import defaultResponse from "../config/response.js"
import { Author } from "../models/Author.js"

async function isAuthor(req,res,next) {
    if (req.user.is_author) {
        const author = await Author.findOne({user_id: req.user.id})
        req.body.author_id = author._id
        return next()
    }
    req.body.success = false
    req.body.sc = 401
    req.body.data = 'you are not Author'
    return defaultResponse(req,res)
}

export default  isAuthor