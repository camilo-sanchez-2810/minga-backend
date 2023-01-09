import defaultResponse from "../config/response.js"

async function isAdmin(req,res,next) {
    if (req.user.is_admin) {
        return next()
    }
    req.body.success = false
    req.body.sc = 401
    req.body.data = 'you are not allowed'
    return defaultResponse(req,res)
}

export default  isAdmin