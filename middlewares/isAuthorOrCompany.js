import defaultResponse from "../config/response.js";
import { Author } from "../models/Author.js";
import { Company } from "../models/Company.js"

export default async function isAuthorOrCompany(req, res, next) {
  try {
    if (req.user.is_author) {
      const author = await Author.findOne({ user_id: req.user.id }, "_id")
      console.log(author)
      req.body.author_id = author._id
      return next()
    }
    if (req.user.is_author) {
      const company = await Company.findOne({ user_id: req.user.id }, "_id")
      req.body.company_id = company._id
      return next()
    }
    req.body.success = false
    req.body.sc = 401
    req.body.data = 'you are not allowed'
    return defaultResponse(req,res)
  } catch(error) {
    req.body.success = false
    req.body.sc = 500
    req.body.data = 'error'
    return defaultResponse(req,res)
  }
}