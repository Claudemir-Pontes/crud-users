import { Router } from "express"
import usersRouter from "./usersRouter"
import profilesRouter from "./profileRouter"
import postsRouter from "./postRouter"

const router = Router()

router.get('/', (request, response) => {
    return response.status(200).send('<h1>CRUD</h1>')
})

router.use('/users', usersRouter)

router.use('/profiles', profilesRouter)

router.use('/posts', postsRouter)

export default router 