import Joi from 'joi-oid'

const schema = Joi.object({
    comic_id: Joi.objectId().required(),
    title: Joi.string().min(1).max(50).required(),
    pages: Joi.array().items(Joi.string().uri()).required(),
    order: Joi.number().min(1),
    
})

export default schema