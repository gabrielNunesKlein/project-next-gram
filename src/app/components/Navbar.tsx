import { auth, signIn } from 'auth'
import Link from 'next/link'
import React from 'react'

export default async function Navbar() {

    const session = await auth()
  return (
    <div>
        <Link href={"/"}>
            Home
        </Link>

        <div>
            {session && session.user ? (
                <div>
                    <p>{session.user.name}</p>
                </div>
            ) : (
                <form action={async () => {
                    "use server"
                    await signIn()
                }}>
                    <button>
                        Entrar
                    </button>
                </form>
            )}
        </div>
    </div>
  )
}
