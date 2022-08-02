import { Router } from "express";

const router = Router()

router.get('/users', (req, res) => {
    return res.status(201).send('<h1>CRUD</h1>')
})

export { router }