import { prisma } from "../models/prismaModel"

interface IPostsRequest {
    title: string,
    body: string,
    author: string,
    currentUser: string,
    id: string,
    published: boolean
}

export class PostService {

    async getPost() {
        const posts = await prisma.post.findMany()
        return posts
    }

    async createPost({ title, body, author }: Partial<IPostsRequest>) {
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