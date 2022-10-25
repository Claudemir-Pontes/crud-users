import { NextFunction, Request, Response } from "express"
import { createUserSchema, updateUserSchema } from "../models/userSchema"

export function createUserValidate(request: Request, response: Response, next: NextFunction) {

    if (request.method == "POST") {
        const { error } = createUserSchema.validate(request.body)
        errors(error, next, response)
        
    } else {
        const { error } = updateUserSchema.validate(request.body)
        errors(error, next, response)
    }
}

function errors(error, next, response){
    const valid = error == null

    if (valid) {
        next()
    } else {
        const { details } = error
        const message = details.map(i => i.message).join(',')
        console.log("error", message)
        response.status(422).json({ error: message })
    }
}

// export function updateUserValidate ( request: Request, response: Response, next: NextFunction ) {
//     const { error } = updateUserSchema.validate(request.body)
//     const valid = error == null

//     if (valid) {
//         next()
//     } else {
//         const { details } = error
//         const message = details.map(i => i.message).join(',')
//         console.log("error", message)
//         response.status(422).json({ error: message })
//     }
// }