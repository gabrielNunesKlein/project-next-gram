import { createUser } from '@/actions'
import React from 'react'

export default function SignOutPage() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form action={createUser} className="p-5 border rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-3">Login</h2>
          <input
            type="text"
            placeholder="nome"
            className="border p-2 w-full mb-3"
            name="name"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            name="email"
          />
          <input
            type="password"
            placeholder="Senha"
            className="border p-2 w-full mb-3"
            name="password"
          />

          <div className="flex flex-col my-5">
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-3" type="submit">
                Confirmar
            </button>
          </div>
        </form>
      </div>
  )
}
