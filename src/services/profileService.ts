import { IProfilesRequest } from "../interfaces/IProfilesRequest"
import { prisma } from "../models/prismaModel"
import { hash } from "bcryptjs"

export class ProfileService {

    async getProfile() {
        const profile = await prisma.profile.findMany()
        return profile
    }

    async createProfile({ bio, picture, name, email, hashed_password }: Partial<IProfilesRequest>) {
        //Check if email exists
        const emailAlreadyExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (emailAlreadyExists) {
            throw new Error("Email already exists!")
        }

        const passwordHash = await hash(hashed_password, 8)  

        await prisma.profile.create({
            data: {
                bio,
                picture,
                user: {
                    create: {
                        name,
                        email,
                        hashed_password: passwordHash
                    }
                }
            }
        })
    }

    async updateProfile({ id, bio, picture, userId }: Partial<IProfilesRequest>) {
        //Check if profile exists
        const profileExists = await prisma.profile.findFirst({
            where: {
                id
            }
        })

        if (!profileExists) {
            throw new Error("Profile does not exist!")
        }
        
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
        //Check if profile exists
        const profileExists = await prisma.profile.findFirst({
            where: {
                id
            }
        })

        if (!profileExists) {
            throw new Error("Profile does not exist!")
        }

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

