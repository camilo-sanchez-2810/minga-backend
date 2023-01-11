import Joi from 'joi-oid'

const schema = Joi.object({
    name: Joi.string().min(3).required(),
    comic_id: Joi.objectId().required(),
    user_id: Joi.objectId().required()
})

export default schema