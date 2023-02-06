import { prisma } from "../models/prismaModel"
import { IPostsRequest } from "../interfaces/IPostsRequest"

export class PostService {

    async getPost() {
        const posts = await prisma.post.findMany()
        return posts
    }

    async createPost({ title, body, author }: Partial<IPostsRequest>) {
        // checks if the user exists
        const authorExists = await prisma.user.findFirst({
            where: {
                id: author
            }
        })

        if (!authorExists) {
            throw new Error("Author does not exist!")
        }

        await prisma.post.create({
            data: {
                title,
                body,
                author: {
                    connect: {
                        id: author
                    }
                }
            }
        })
    }

    async updatePost({ currentUser, id, title, body, published }: Partial<IPostsRequest>) {

        //Check if post exists
        const postExists = await prisma.post.findFirst({
            where: {
                id
            }
        })

        if (!postExists) {
            throw new Error("Posts does not exist!")
        }

        // checks if the user owns the Post
        const postAuthor = await prisma.post.findFirst({
            where: {
                id
            }
        })

        if (currentUser != postAuthor.authorId) {
            throw new Error("Access denied.")
        }

        // updates the Post.
        await prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                body,
                published
            }
        })
    }

    async deletePost({ currentUser, id }: Partial<IPostsRequest>) {
        //Check if post exists
        const postExists = await prisma.post.findFirst({
            where: {
                id
            }
        })

        if (!postExists) {
            throw new Error("Posts does not exist!")
        }

        // checks if the user owns the Post
        const postAuthor = await prisma.post.findFirst({
            where: {
                id
            }
        })

        if (currentUser != postAuthor.authorId) {
            throw new Error("Access denied.")
        }

        // delete the post
        await prisma.post.delete({
            where: {
                id
            }
        })
    }
}