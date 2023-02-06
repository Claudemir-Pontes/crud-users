import { NextFunction, Request, Response } from "express"
import Joi, { ObjectSchema } from "joi"
import { IPostsRequest } from "../interfaces/IPostsRequest"

export const postValidate = (schema: ObjectSchema) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(request.body)
            next()
        }
        catch (error) {
            return response.status(400).send(error.message)
        }
    }
}

export const postSchema = {
    create: Joi.object<IPostsRequest>({
        title: Joi
            .string()
            .min(3)
            .max(150)
            .required(),

        body: Joi
            .string()
            .min(3)
            .max(1000)
            .required(),

        author: Joi
            .string()
            .required(),
    }),

    update: Joi.object<IPostsRequest>({
        currentUser: Joi
            .string()
            .required(),

        id: Joi
            .string()
            .required(),

        title: Joi
            .string()
            .min(3)
            .max(150),

        body: Joi
            .string()
            .min(3)
            .max(1000),

        published: Joi
            .boolean()
            .required()
    }),

    delete: Joi.object<IPostsRequest>({
        currentUser: Joi
            .string()
            .required(),

        id: Joi
            .string()
            .required()
    })
}