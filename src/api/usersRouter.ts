import express from "express"
import { validationMiddleware } from "../middlewares/userValidation"
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService"


const router = express.Router()

router.get('/', async (req, res) => {

    try {
        const usersTDO = req.body

        const users = await getUsers()

        // if (!users) {
        //     throw new Error('Falha ao acessar banco de dados.')
        //   }

        res.status(200).json(users)

    } catch (err) {
        res.status(401).send(err.message)
    }
})

router.post('/', validationMiddleware, async (req, res) => {
    try {
        const dadosTDO = req.body

        await createUser(dadosTDO)

        res.status(201).send('Usuario criado com sucesso.')
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/', validationMiddleware, async (req, res) => {

    try {
        const dadosTDO = req.body

        await updateUser(dadosTDO)

        res.status(201).send('Usuario atualizado com sucesso.')

    } catch (err) {
        res.status(400).send(console.error(err.message))
    }
})

router.delete('/', async (req, res) => {
    try {
        const userId = req.body.id

        await deleteUser(userId)

        res.status(200).send('Usuario deletado com sucesso.')

    } catch (err) {
        res.status(400).send(console.error(err.message))
    }

})

export default router