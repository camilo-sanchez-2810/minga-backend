import defaultResponse from '../config/response.js'
import { Author } from '../models/Author.js'
const controller = {
  create: async (req, res, next) => {
    req.body.active = true
    req.body.user_id = req.user.id
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
  get_author: async (req, res, next) => {
    const { id } = req.params
    try {
        let author = await Author.find({ _id: id }, "-_id -user_id")
        if (author) {
            res.status(200).json({
                success: true,
                response: author,
            })
        } else {
            res.status(400).json({
                success: false,
                response: "Error obtaining Author",
            })
        }
    } catch (error) {
        next(error)
    }
},
update: async (req, res, next) => {
  const authorInfo = req.body;
  console.log(req.user)
      try{
        let result = await Author.findOneAndUpdate({user_id: req.user.id}, {$set: authorInfo}, {new: true});
                console.log(result);
                if(result){
                    return res.status(200).json({
                        success: true,
                        message: 'Updated'
                    });
                }else{
                    return res.status(404).json({
                        success: false,
                        message: 'Not found'
                      })
                }
              } catch(error){
                next(error)
                return res.status(400).json({
                    success: false,
                    message: error
                  })
            }
        }
}


export default controller