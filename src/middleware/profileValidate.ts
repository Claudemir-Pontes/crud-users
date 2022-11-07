import { NextFunction, Request, Response } from "express"
import Joi, { ObjectSchema } from 'joi'
import { IProfilesRequest } from "../interfaces/IProfilesRequest"

export const profileValidate = (schema: ObjectSchema) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(request.body)
            next()
        } catch (error) {
            return response.status(400).send(error.message)
        }
    }
}

export const profileSchema = {
    create: Joi.object<IProfilesRequest>({
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

        bio: Joi
            .string()
            .max(500)
            .required().allow(''),

        picture: Joi
            .string()
            .max(150)
            .uri()
            .required().allow('')
    }),

    update: Joi.object<IProfilesRequest>({
        id: Joi
            .string()
            .required(),

        userId: Joi
            .string(),

        bio: Joi
            .string()
            .max(500),

        picture: Joi
            .string()
            .max(150)
            .uri()
    }),

    delete: Joi.object<IProfilesRequest>({
        id: Joi
            .string()
            .required()
    })
}
