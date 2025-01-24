import { auth } from 'auth';
import React from 'react'

export default async function ServerPage() {

    const session = await auth();

    if(!session || !session.user){
        return (
            <p>Você precisa estar autenticado| server</p>
        )
    }
  return (
    <div>
        <h1>Bem-vindo a server page!</h1>
    </div>
  )
}
