"use client"

import { useSession } from "next-auth/react"

import React from 'react'

export default function ClientPage() {
    const { data: session } = useSession()

    if(!session || !session.user) return <p>Você precisa estar autenticado</p>
  return (
    <div>
        <h1>Component client autenticado</h1>
    </div>
  )
}
