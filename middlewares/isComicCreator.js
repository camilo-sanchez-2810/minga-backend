import defaultResponse from "../config/response.js";
import { Comic } from "../models/Comic.js";

export default async function isComicCreator(req, res, next) {
  const { id } = req.params
  let query = {
    _id: id
  }
  if(req.body.author_id) {
    query['author_id'] = req.body.author_id
  }
  if(req.body.company_id) {
    query['company_id'] = req.body.company_id
  }
  try {
    const comic = await Comic.findOne(query)
    if(comic) {
      return next()
    }
    req.body.success = false
    req.body.sc = 401
    req.body.data = 'you are not allowed'
    return defaultResponse(req,res)
  } catch (error) {
    req.body.success = false
    req.body.sc = 500
    req.body.data = 'error'
    return defaultResponse(req,res)
  }
}