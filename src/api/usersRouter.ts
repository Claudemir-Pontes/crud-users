import { Router } from "express"
import { UserService } from "../services/userService"
import { userSchema, userValidate } from "../middleware/userValidate"
import { IUserRequest } from "../interfaces/IUserRequest"

const router = Router()


const userService = new UserService()

router.get('/', async (request, response) => {

    try {
        const users = await userService.getUsers()

        response.status(200).json(users)
    }
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.post('/', userValidate(userSchema.create), async (request, response) => {
    try {
        const { name, email, hashed_password } = request.body as IUserRequest

        await userService.createUser({ name, email, hashed_password })
        response.status(201).send('User created successfully.')
    }
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.put('/', userValidate(userSchema.update), async (request, response) => {

    try {
        const { id, name, email, hashed_password } = request.body as IUserRequest

        await userService.updateUser({ id, name, email, hashed_password })
        response.status(200).send('User successfully updated.')
    }
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.delete('/', userValidate(userSchema.delete), async (request, response) => {
    try {
        const { id } = request.body as IUserRequest

        await userService.deleteUser({ id })
        response.status(200).send('User successfully deleted.')
    }
    catch (error) {
        response.status(400).send(error.message)
    }

})

export default router