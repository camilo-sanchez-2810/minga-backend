import Joi from 'joi-oid'

const schema = Joi.object({
    comic_id: Joi.objectId().required(),
    title: Joi.string().min(1).max(100).required().messages({
        "any.required":" The title is required, please enter data",
        "string.empty":" Enter your title",
        "string.min":" Minimun characters are 1",
        "string.max":" Maximun characters are 100"
    }),
    pages: Joi.array().items(Joi.string().uri()).required(),
    order: Joi.number().min(1),
    
})

export default schema