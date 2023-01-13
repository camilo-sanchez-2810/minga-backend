import Joi from 'joi-oid'

const schema = Joi.object({
    name: Joi.string().required(),
    user_id: Joi.objectId().required(),
    comic_id: Joi.objectId().required()
})

export default schema