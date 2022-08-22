import { prisma } from "../models/prismaModel"

interface IUserRequest {
    id: string,
    name: string;
    age: number,
    photo: string,
    email: string,
    password: string;
}

export class UserService {

    async getUsers() {

        const users = await prisma.users.findMany()
        return users
    }

    async createUser(dataTDO: IUserRequest) {

        //Check if user exists
        const userAlreadyExists = await prisma.users.findFirst({
            where: {
                email: dataTDO.email,
            },
        })

        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }

        //Register the User
        await prisma.users.create({
            data: dataTDO
        })
    }

    async updateUser(dataTDO: IUserRequest) {

        await prisma.users.update({
            where: {
                id: dataTDO.id
            },
            data: dataTDO
        })
        console.log('db updated.')
    }

    async deleteUser(userId: string) {
        await prisma.users.delete({
            where: {
                id: userId
            }
        })
    }
}

