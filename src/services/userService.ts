import { prisma } from "../models/prismaModel"

interface IUserRequest {
    id: string,
    name: string,
    email: string,
    hashed_password: string
}

export class UserService {

    async getUsers() {

        const users = await prisma.user.findMany()
        return users
    }

    async createUser(dataTDO: IUserRequest) {

        //Check if user exists
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email: dataTDO.email,
            },
        })

        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }

        //Register the User
        await prisma.user.create({
            //data: dataTDO
            data: {
                name: dataTDO.name,
                email: dataTDO.email,
                hashed_password: dataTDO.hashed_password,
                // profile: {
                //     create:{
                //         bio: "aaaa",
                //         picture: Buffer.from("abc")
                //     }
                // }
            }
        })
    }

    async updateUser(dataTDO: IUserRequest) {

        //Check if email exists
        // see later
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email: dataTDO.email,
            },
        })

        if (userAlreadyExists) {
            throw new Error("Email already exists!");
        }

        //Update the user
        await prisma.user.update({
            where: {
                id: dataTDO.id
            },
            data: dataTDO
        })
        console.log('db updated.')
    }

    async deleteUser(userId: string) {
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
    }
}

