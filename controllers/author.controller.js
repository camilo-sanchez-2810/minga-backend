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
  },
    update: async (req, res, next) => {
        const authorInfo = req.body;
            try{
                let result = await Author.findOneAndUpdate({id: authorInfo._id}, {$set: authorInfo});
            return res.status(200).json({
                success: true,
                message: result
            });
            } catch(error){
                next(error)
            }
        },
      }


export default controller