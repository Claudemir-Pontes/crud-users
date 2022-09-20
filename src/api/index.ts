import { Router } from "express";
import usersRouter from "./usersRouter"
import profileRouter from "./profileRouter"

const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send('<h1>CRUD</h1>')
})

router.use('/users',usersRouter)

router.use('/profile',profileRouter)

export default router 