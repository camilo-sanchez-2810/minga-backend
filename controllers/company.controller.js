import { Company } from "../models/Company.js"

const controller = {
    update: async (req,res,next) => {
        const companyInfo = req.body
        console.log(req.user.id)
        try{
            let result = await Company.findOneAndUpdate({user_id: req.user.id}, {$set: companyInfo}, {new: true});
        return res.status(200).json({
            success: true,
            message: result
        })
        }
        catch(error){
            next(error)
        }
    },
    get_company: async (req, res, next) => {
        try {
            const { id } = req.params
            let companies = await Company.findById(id, "-_id -user_id -createdAt -updatedAt")
            if(companies){
                res.status(200).json({
                    success: true,
                    response: companies,
                })
            } else{
                res.status(400).json({
                    success: false,
                    response: 'Company not found'
                })
            }
            
        } catch(error) {
            next(error)
        }
    },
}
export default controller