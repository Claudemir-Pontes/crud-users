import { NextFunction, Request, Response } from "express"
import Joi, { ObjectSchema } from 'joi'
import { IUserRequest } from "../interfaces/IUserRequest"

export const userValidate = (schema: ObjectSchema) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(request.body)
            next()
        } catch (error) {
            return response.status(400).send(error.message)
        }
    }
}

export const userSchema = {
    create: Joi.object<IUserRequest>({
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
    }),
    
    update: Joi.object<IUserRequest>({
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
    }),

    delete: Joi.object<IUserRequest>({
        id: Joi
        .string()
        .required()
    })
}
