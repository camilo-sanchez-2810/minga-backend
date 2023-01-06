import defaultResponse from '../config/response.js'
import { Author } from '../models/Author.js'
const controller = {
  create: async (req, res, next) => {
    req.body.active = true
    try {
      await Author.create(req.body)
      req.body.success = true
      req.body.sc = 201
      req.body.data = 'author created'
      return defaultResponse(req, res)
    } catch(error) {
      next(error)
    }
  }
}

export default controller