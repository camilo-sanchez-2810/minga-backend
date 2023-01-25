import Joi from 'joi-oid'

const schema = Joi.object({
    company_id: Joi.objectId(),
    title: Joi.string().min(10).required(),
    photo: Joi.string().uri().min(1).required(),
    description: Joi.string().min(20).required(),
    category_id: Joi.objectId().required()
})

export default schema