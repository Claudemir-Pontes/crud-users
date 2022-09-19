import Joi from 'joi'

export const userSchema = Joi.object({
    id: Joi.string(),

    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    hashed_password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})


