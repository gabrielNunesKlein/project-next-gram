import React from 'react'
import { signIn, providerMap } from 'auth'

import { BsGoogle, BsFacebook } from 'react-icons/bs'
import { redirect } from 'next/navigation'

const icons = [{ name: "Google", icon: <BsGoogle /> }, { name: "Facebook", icon: <BsFacebook /> }]

export default function SigninPage() {

  const findIcon = (name: string ) => {
    const iconFind = icons.find((item) => item.name === name)
    return iconFind?.icon ?? ""
  }

  return (
    <div className='w-1/2 mx-auto my-10 px-4 flex flex-col gap-2'>
        <h2 className='text-[2rem] leading-10 font-semibold text-center'>
            Acesse ou crie sua conta com uma das opções disponiveis.
        </h2>
        { Object.values(providerMap).map((provider) => (
            <form 
            className='mt-10 flex justify-center'
            key={provider.id} 
            action={async () => {
                "use server"

                if(provider.name === "Credentials") {
                  redirect('/signin/credentials')
                }

                await signIn(provider.id, { redirectTo: "/" })
            }}>
                <button className='h-10 px-6 py-1 font-medium border border-zinc-600 flex items-center gap-2 rounded hover:bg-slate-50'>
                    {findIcon(provider.name)}
                    <span>Entrar com o <strong>{provider.name}</strong></span>
                </button>
            </form>
        ))}
    </div>
  )
}
