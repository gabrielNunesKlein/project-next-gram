"use server"

import { PrismaClient } from "@prisma/client"

import { User } from "@prisma/client"
import { auth } from "auth"
import { redirect } from "next/navigation"

import { promises as fs } from "fs"

import path from "path"
import { revalidatePath } from "next/cache"

import bcrypt from "bcryptjs";

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

    const session = await auth()

    if(!session) redirect("/")
    
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const imageFile = formData.get("image") as File

    if(session.user.userId !== id){
        throw new Error("Não autorizado.")
    }

    if(name.length < 5){
        return { message: "Nome precisa ter no minimo 5 caracteries.", type: 'error'}   
    }

    let imageUrl
    if(imageFile && imageFile.name !== "undefined"){
        const uploadDir = path.join(process.cwd(), "public", "uploads")
        await fs.mkdir(uploadDir, { recursive: true}) 

        const filePath = path.join(uploadDir, imageFile.name)
        const arrayBuffer = await imageFile.arrayBuffer()


        await fs.writeFile(filePath, Buffer.from(arrayBuffer))

        imageUrl = `/uploads/${imageFile.name}`
    }

    const dataToUpdate = imageUrl ? { name, image: imageUrl } : { name }

    await prisma.user.update({
        where: { id },
        data: dataToUpdate
    })

    revalidatePath("/profile")

    return {
        message: "Perfíl atualizado com sucesso",
        type: "success"
    }
}

export async function createPost(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();

  if (!session) redirect("/");

  const caption = formData.get("caption") as string;
  const imageFile = formData.get("image") as File;

  if (!caption || imageFile.size == 0) {
    return { message: "Precisa de legeda e foto", type: "error" };
  }

  let imageUrl;
  if (imageFile && imageFile.name !== "undefined") {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, imageFile.name);
    const arrayBuffer = await imageFile.arrayBuffer();

    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    imageUrl = `/uploads/${imageFile.name}`;
  }

  await prisma.post.create({
    data: {
      imageUrl: imageUrl || "",
      caption,
      userId: session.user.userId,
    },
  });

  return {
    message: "Postagem criada com sucesso!",
    type: "success",
  };
}

export async function getUsersPosts(userId: string){

    const session = await auth()

    if (!session) redirect("/");

    if(session.user.userId !== userId){
        throw new Error("Não autorizado")
    }

    return await prisma.post.findMany({
        where: { userId },
        include: {
            user: true,
            likes: true,
            comments: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function deletePost(formData: FormData) {
    const session = await auth()

    if (!session) redirect("/");


    const userId = formData.get("userId") as string
    const postId = formData.get("postId") as string

    await prisma.post.delete({
        where: {
            id: postId,
            userId: userId
        }
    })

    revalidatePath("/my-posts")
    redirect("/my-posts")
}

export async function getAllPosts(){

    return await prisma.post.findMany({
        include: {
            user: true,
            likes: true,
            comments: {
                include: {
                    user: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export async function likePost(postId: string, userId: string) {

    const session = await auth()

    if(!session) redirect("/")

    if(session.user.userId !== userId){
        throw new Error("Não autorizado.")
    }

    const existLike = await prisma.like.findFirst({
        where: {
            postId,
            userId
        }
    });

    if(existLike){
        await prisma.like.delete({
            where: {
                id: existLike.id
            }
        })
    } else {
        await prisma.like.create({
            data: {
                postId,
                userId
            }
        })
    }

    revalidatePath("/")
}

export async function addComment(postId: string, userId: string, content: string){

    const session = await auth()

    if(!session) redirect("/")

    if(session.user.userId !== userId){
        throw new Error("Não autorizado.")
    }

    await prisma.comment.create({
        data: {
            postId,
            userId,
            content
        }
    })

    revalidatePath("/")

}

export async function createUser(formData: FormData){

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const hashedPassword = await bcrypt.hash(password, 10);    

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    redirect("/signin/credentials")

}