import Joi from 'joi'
import { join } from 'path'

export const createUserSchema = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    hashed_password: Joi
        .string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$'))
        .required(),

})

export const updateUserSchema = Joi.object({
    id: Joi
        .string()
        .required(),

    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30),

    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    hashed_password: Joi
        .string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$'))

})
