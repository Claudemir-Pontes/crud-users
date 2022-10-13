import { Router } from "express"
import { PostService } from "../services/postService"


const router = Router()
const postService = new PostService()

router.get('/', async (request, response) => {
    try {
        const posts = await postService.getPost()
        response.status(200).send(posts)
    }
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.post('/', async (request, response) => {
    try {
        const { title, body, author } = request.body

        await postService.createPost({ title, body, author })
        response.status(201).send("The post was created successfully.")
    } 
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.put('/', async (request, response) => {
    try {
        const { currentUser, id, title, body, published } = request.body

        await postService.updatePost({ currentUser, id, title, body, published })
        response.status(200).send("The post has been successfully updated.")
    } 
    catch (error) {
        response.status(400).send(error.message)
    }
})

router.delete('/', async (request, response) => {
    try {
        const { currentUser, id } = request.body

        await postService.deletePost({ currentUser, id })
        response.status(200).send("The post has been successfully deleted.")
    } 
    catch (error) {
        response.status(400).send(error.message)
    }
})

export default router