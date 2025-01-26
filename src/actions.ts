"use server"

import { PrismaClient } from "@prisma/client"

import { User } from "@prisma/client"

import path from "path"

type FormState = {
    message: string;
    type: string;
}

const prisma = new PrismaClient()

export async function getUserByEmail(email: string | null): Promise<User | null >{

    if(!email) return null

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    return user;

}

export async function updateUserProfile(formState: FormState, formData: FormData): Promise<FormState> {
    return {
        message: "Perfíl atualizado com sucesso",
        type: "success"
    }
}