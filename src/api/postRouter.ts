import { Router } from "express"
import { PostService } from "../services/postService"


const router = Router()
const profileService = new PostService()

router.post('/', async (req, res) => {
    try {
        const post = req.body

        await profileService.createPost(post)

        res.status(201).send("Post created successfully.")
    } catch (err) {
        res.status(400).send(err.message)
    }
})

export default router