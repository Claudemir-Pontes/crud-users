import { prisma } from "../models/prismaModel"

export class PostService {

    async createPost(post) {
        await prisma.post.create({
            data: {
                title: post.title,
                body: post.body,
                author: {
                    connect: {
                        id: post.author
                    }
                }
            }

        })
    }

    async getPost() {
        const post = await prisma.post.findMany()
        return post
    }

    async updatePost(postTDO) {

        const userRequest = postTDO.userRequest

        // checks if the user owns the Post
        const userPost = await prisma.post.findFirst({
            where: {
                id: postTDO.id
            }
        })

        if (userRequest != userPost.authorId) {
            throw new Error("Access denied.")
        }

        // updates the Post.
        await prisma.post.update({
            where: {
                id: postTDO.id
            },
            data: {
                title: postTDO.title,
                body: postTDO.body,
                published: postTDO.published
            }
        })
    }

    async deletePost(dataTDO) {
        const userRequest = dataTDO.userRequest

        // checks if the user owns the Post
        const userPost = await prisma.post.findFirst({
            where: {
                id: dataTDO.id
            }
        })

        if (userRequest != userPost.authorId) {
            throw new Error("Access denied.")
        }

        // delete the post
        await prisma.post.delete({
            where: {
                id: dataTDO.id
            }
        })
    }
}