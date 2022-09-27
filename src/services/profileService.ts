import { prisma } from "../models/prismaModel"

interface IProfileRequest {
    id: string,
    bio: string,
    picture: string,
    name: string,
    email: string,
    hashed_password: string,
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
                user: {
                    create: {
                        name: dataTDO.name,
                        email: dataTDO.email,
                        hashed_password: dataTDO.hashed_password
                    }
                }
            }
        })

        // if (!createProfile) {
        //     throw new Error("Error creating profile!");
        // }

    }

    async updateProfile(dataTDO: IProfileRequest) {
        await prisma.profile.update({
            where: {
                id: dataTDO.id
            },
            data: {
                bio: dataTDO.bio,
                picture: Buffer.from(dataTDO.picture)
            }
        })
    }

    async deleteProfile(idProfile: IProfileRequest) {
        await prisma.profile.delete({
            where: {
                id: idProfile.id
            }
        })
    }
}
