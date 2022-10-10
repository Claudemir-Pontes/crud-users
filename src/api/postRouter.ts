import { response, Router } from "express"
import { request } from "http"
import { PostService } from "../services/postService"


const router = Router()
const postService = new PostService()

router.post('/', async (req, res) => {
    try {
        const post = req.body

        await postService.createPost(post)

        res.status(201).send("Post created successfully.")
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const post = await postService.getPost()
        res.status(200).send(post)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.put("/", async (request, response) => {
    try {
        const postTDO = request.body
        await postService.updatePost(postTDO)
        response.status(200).send("Post successfully updated.")
    } catch (error) {
        response.status(400).send(error.message)
    }
    
})

router.delete("/", async (request, response) => {
    try {
        const dataTDO = request.body
        await postService.deletePost(dataTDO)
        response.status(200).send("Post successfully deleted.")
    } catch (error) {
        response.status(400).send(error.message)
    }
})

export default router