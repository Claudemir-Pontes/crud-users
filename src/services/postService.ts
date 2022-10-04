import { prisma } from "../models/prismaModel"

export class PostService {

    async createPost(post){
        await prisma.post.create({
            data: post
        })
    }
}