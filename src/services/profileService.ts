import { prisma } from "../models/prismaModel"

interface IProfileRequest {
    id: string,
    bio: string,
    picture: string,
    userId: string
}

export class ProfileService {

    async getProfile() {
        const profile = await prisma.profile.findMany()
        return profile
    }

    async createProfile(dataTDO: IProfileRequest) {
        const createProfile = await prisma.profile.create({
            data: {
                bio: dataTDO.bio,
                picture: Buffer.from(dataTDO.picture),
                //userId: dataTDO.userId,
                user: {
                    create: {
                        name: "carlos",
                        email: "example8@.com",
                        hashed_password: "123"
                    }
                }
            }
        })

        // if (!createProfile) {
        //     throw new Error("Error creating profile!");
        // }

    }
}

