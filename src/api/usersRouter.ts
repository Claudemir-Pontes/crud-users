import { Router } from "express"
import { validationMiddleware } from "../middlewares/userValidation"
//import { getUsers, createUser, updateUser, deleteUser } from "../services/userService"
import { UserService } from "../services/userService"


const router = Router()

const userService = new UserService()

router.get('/', async (req, res) => {

    try {
        const users = await userService.getUsers()

        res.status(200).json(users)

    } catch (err) {
        res.status(401).send(err.message)
    }
})

router.post('/', validationMiddleware, async (req, res) => {
    try {
        const dataTDO = req.body

        await userService.createUser(dataTDO)

        res.status(201).send('User created successfully.')
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.put('/', validationMiddleware, async (req, res) => {

    try {
        const dataTDO = req.body

        await userService.updateUser(dataTDO)

        res.status(200).send('User successfully updated.')

    } catch (err) {
        res.status(400).send(console.error(err.message))
    }
})

router.delete('/', async (req, res) => {
    try {
        const userId = req.body.id

        await userService.deleteUser(userId)

        res.status(200).send('User successfully deleted.')

    } catch (err) {
        res.status(400).send(console.error(err.message))
    }

})

export default router