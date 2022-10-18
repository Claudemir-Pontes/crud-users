import { prisma } from "../models/prismaModel"

interface IProfilesRequest {
    id: string,
    bio: string,
    picture: string,
    name: string,
    email: string,
    hashed_password: string,
    userId: string
}

export class ProfileService {

    async getProfile() {
        const profile = await prisma.profile.findMany()
        return profile
    }

    async createProfile({ bio, picture, name, email, hashed_password }: Partial<IProfilesRequest>) {
        const createProfile = await prisma.profile.create({
            data: {
                bio,
                picture,
                user: {
                    create: {
                        name,
                        email,
                        hashed_password
                    }
                }
            }
        })
    }

    async updateProfile({ id, bio, picture, userId }: Partial<IProfilesRequest>) {
        await prisma.profile.update({
            where: {
                id
            },
            data: {
                bio,
                picture,
                user: {
                    update: {
                        id: userId
                    }
                }
            }
        })
    }

    async deleteProfile({ id }: Partial<IProfilesRequest>) {
        const userId = await prisma.profile.delete({
            where: {
                id
            }
        })
        await prisma.user.delete({
            where: {
                id: userId.userId
            }
        })
    }
}

