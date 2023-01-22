import { Comic } from "../models/Comic.js";
import defaultResponse from "../config/response.js";


const controller_one = {
    get_comic: async (req, res, next) => {
        try {
          const { id } = req.params
          let one = await Comic.findById(id, '-_id -company_id -category')
          .populate({path: "author_id", select: 'name -_id'})
          .populate({path: "category_id", select: 'name -_id'})
          if (one) { 
            res.status(200).json({
              success: true,
              response: one
            })
          } else {
            res.status(400).json({ 
              success: false,
              response: 'comic not found'
            })
          }
        } catch (error) {
          next(error)
        }
      }
    } 
    
    export default controller_one   