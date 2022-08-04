import { Router } from "express";
import usersRouter from "./usersRouter"

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send('<h1>CRUD</h1>')
})

router.use('/users',usersRouter)

export default router 