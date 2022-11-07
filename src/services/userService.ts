import { prisma } from "../models/prismaModel"
import { IUserRequest } from "../interfaces/IUserRequest"

export class UserService {

    async getUsers() {

        const users = await prisma.user.findMany()
        return users
    }

    async createUser({ name, email, hashed_password }: Partial<IUserRequest>) {

        //Check if user exists
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (userAlreadyExists) {
            throw new Error("User already exists!")
        }

        //Register the User
        await prisma.user.create({
            data: {
                name,
                email,
                hashed_password
            }
        })
    }

    async updateUser({ id, name, email, hashed_password }: IUserRequest) {

        //Check if email exists
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Email already exists!")
        }

        //Update the user
        await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                hashed_password
            }
        })
    }

    async deleteUser({ id }: Partial<IUserRequest>) {
        //Check if user exists
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                id
            }
        })

        if (!userAlreadyExists) {
            throw new Error("User does not exist!")
        }

        await prisma.user.deleteMany({
            where: {
                id
            }
        })
    }
}

