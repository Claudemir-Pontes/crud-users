import { Router } from "express"
import usersRouter from "./usersRouter"
import profilesRouter from "./profileRouter"
import postsRouter from "./postRouter"
import { json } from "stream/consumers"

const router = Router()

router.get('/', (request, response) => {
    const res =[{
        'crud':'crudddddddddddddddddddddddddddd',
        'cru':'cruuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu'
    }]
    
    return response.status(200).json(res)
})

router.use('/users', usersRouter)

router.use('/profiles', profilesRouter)

router.use('/posts', postsRouter)

export default router 