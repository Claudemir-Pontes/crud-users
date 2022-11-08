import { prisma } from "../models/prismaModel"
import { IUserRequest } from "../interfaces/IUserRequest"
import { hash } from "bcryptjs"

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

        const passwordHash = await hash(hashed_password, 8)

        //Register the User
        await prisma.user.create({
            data: {
                name,
                email,
                hashed_password: passwordHash
            }
        })
    }

    async updateUser({ id, name, email, hashed_password }: IUserRequest) {

        //Check if user exists
        const userExists = await prisma.user.findFirst({
            where: {
                id
            }
        })

        if (!userExists) {
            throw new Error("User does not exists!")
        }

        //Check if this email can be used.
        const emailExists = await prisma.user.findFirst({
            where: {
                email
            }
        })

        const sameEmail = email == userExists.email

        if (!sameEmail && email != undefined && emailExists) {
            throw new Error("This email cannot be used!")
        }

        const passwordHash = await hash(hashed_password, 8)

        //Update the user
        await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                email,
                hashed_password: passwordHash
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

