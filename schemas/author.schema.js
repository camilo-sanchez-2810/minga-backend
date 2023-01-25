import Joi from 'joi-oid'

const schema = Joi.object({
  name: Joi.string().min(2).max(15).required().messages({
    'any.required': 'Name is require',
    'string.empty': 'Name can not be empty',
    'string.min': 'Name is too short',
    'string.max': 'Name is too long',
    }),
  last_name: Joi.string().min(0).max(15).messages({
    'string.max': 'Last name is too long',
    }),
  city: Joi.string().min(3).max(15).required().messages({
    'any.required': 'City is require',
    'string.empty': 'City can not be empty',
    'string.min': 'City is too short',
    'string.max': 'City is too long',
    }),
  country: Joi.string().min(3).max(10).required().messages({
    'any.required': 'Country is require',
    'string.empty': 'Country can not be empty',
    'string.min': 'Country is too short',
    'string.max': 'Country is too long',
    }),
  date: Joi.date(),
  photo: Joi.string().uri().required().messages({
    'any.required': 'Photo is require',
    'string.empty': 'Photo can not be empty',
    'string.uri': 'Photo need to be an url',
    })
})

export default schema