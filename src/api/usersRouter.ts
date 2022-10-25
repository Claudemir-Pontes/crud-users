import { Router } from "express"
import { createUserValidate } from "../middlewares/userValidation"
import { UserService } from "../services/userService"

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

router.post('/', createUserValidate, async (request, response) => {
    try {
        const { name, email, hashed_password } = request.body

        await userService.createUser({ name, email, hashed_password })
        response.status(201).send('User created successfully.')
    }
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.put('/', createUserValidate, async (request, response) => {

    try {
        const { id, name, email, hashed_password } = request.body

        await userService.updateUser({ id, name, email, hashed_password })
        response.status(200).send('User successfully updated.')
    }
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.delete('/', async (request, response) => {
    try {
        const { id } = request.body

        await userService.deleteUser({ id })
        response.status(200).send('User successfully deleted.')
    }
    catch (error) {
        response.status(400).send(error.message)
    }

})

export default router