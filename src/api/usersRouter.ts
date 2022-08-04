import express from "express"
import { getUsers, createUser, updateUser } from "../services/userService"


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

router.post('/', async (req, res) => {
    try {
        const dadosTDO = req.body

        await createUser(dadosTDO)

        res.status(201).send('Usuario criado com sucesso.')
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/', async (req, res) => {

    // validações
    
    let erros = []

    if (!req.body.id || typeof req.body.id == undefined || req.body.id == null) {
        erros.push({ texto: "id invalido" })
        res.status(400).send(erros)
        
    }

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        erros.push({ texto: "name invalido" })
        res.status(400).send(erros)
        
    }

    if (!req.body.Photo || typeof req.body.Photo == undefined || req.body.Photo == null) {
        erros.push({ texto: "Photo invalida" })
        res.status(400).send(erros)
        
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "email invalido" })
        res.status(400).send(erros)
        
    }
    
    if ( typeof req.body.isRoot == undefined || req.body.isRoot == null) {
        erros.push({ texto: "isRoot invalido" })
        res.status(400).send(erros)
        
    }
    
    if (!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
        erros.push({ texto: "password invalido" })
        res.status(400).send(erros)
        
    }
    
    else {
        try {
            const dadosTDO = req.body

            await updateUser(dadosTDO)

            res.status(201).send('Usuario atualizado com sucesso.')

        } catch (err) {
            res.status(400).send(console.error(err.message))
        }
    }


})

export default router