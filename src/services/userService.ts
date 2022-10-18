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

    async createUser({ name, email, hashed_password }: Partial<IUserRequest>) {

        //Check if user exists
        const userAlreadyExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (userAlreadyExists) {
            throw new Error("User already exists!");
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
        await prisma.user.delete({
            where: {
                id
            }
        })
    }
}

