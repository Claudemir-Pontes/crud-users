import { prisma } from "../models/prismaModel"

export class PostService {

    async getPost() {
        const posts = await prisma.post.findMany()
        return posts
    }

    async createPost({ title, body, author }) {
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

    async updatePost({ currentUser, id, title, body, published }) {

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

    async deletePost({ currentUser, id }) {

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