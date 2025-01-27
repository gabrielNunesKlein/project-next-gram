import CreatePostForm from '@/components/CreatePostForm'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function NestPostPage() {

    const session = await auth()

    if(!session) return redirect("/")

  return (
    <div className='w-[35rem] mx-auto p-4 my-10'>
        <h1 className='text-[2rem] leading-10 font-semibold text-center'>
            Criar novo post
        </h1>
        <div className="border border-zinc-300 p-4 rounded mt-8">
            <CreatePostForm />
        </div>
    </div>
  )
}
