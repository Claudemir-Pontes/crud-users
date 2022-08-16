import {prisma}  from "../models/prismaModel"

export async function getUsers(){

    const users = await prisma.users.findMany()
    return users
}

export async function createUser( dadosTDO){

    console.log(dadosTDO)

    await prisma.users.create({
        
        data :  dadosTDO
    })
}

export async function updateUser(dadosTDO){

    console.log(dadosTDO)
    
    await prisma.users.update({
        where:{
            id: dadosTDO.id,
        },
        data: dadosTDO
    })
    console.log('bd atualizado')
}

export async function deleteUser(userId: string) {
    await prisma.users.delete({
        where:{
            id: userId
        }
    })
}
