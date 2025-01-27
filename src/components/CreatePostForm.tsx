"use client"

import { createPost } from "@/actions"
import React from "react"
import { useActionState } from "react"
import { FlashMessage } from "./FlashMessage"
import ImagePreview from "./ImagePreview"
import { Button } from "./Button"
import Label from "./Label"

export default function CreatePostForm() {
        const [formState, formAction] = React.useActionState(createPost, {
            message: "",
            type: "success"
        })

  return (
    <div>
        {formState.message && (
           <FlashMessage message={formState.message} type={formState.type} />
        )}

        <form action={formAction} className='flex flex-col gap-4' encType='multipart/form-data'>
            <ImagePreview />
            <div>
                <Label htmlFor='caption' text='Conteudo do post' />
                <textarea 
                    name="caption" 
                    id="caption"
                    placeholder='Digite algo...'
                    className='p-2 border h-32 border-zinc-300 roude w-full text-sm placeholder:text-zinc-500 focus:ring-0 focus:outline-none'
                ></textarea>
            </div>
            <div className="flex justify-end">
                <Button type='submit' text='Criar Post' />
            </div>
        </form>
    </div>
  )
}
