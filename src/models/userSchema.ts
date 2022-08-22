import Joi from 'joi'

export const userSchema = Joi.object({
    id: Joi.string(),

    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    age: Joi.number()
        .integer()
        .min(18)
        .max(100),

    photo: Joi.string()
        .uri()
        .required()
        .allow(''),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})
