

import { signIn } from "auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CredentialsPage() {
  
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form action={
            async (formData: FormData) => {
                "use server"

                try {
                    const email = formData.get("email") as string
                    const password = formData.get("password") as string

                    await signIn("credentials", {
                        redirect: false,
                        email,
                        password,
                    });

                    redirect("/")
                } catch(err) {
                    throw new Error("Erro " + err)
                }

        }} className="p-5 border rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-3">Login</h2>
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
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-3" type="submit">
                Entrar
            </button>
            <span className="text-center">Ou</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-3" type="button">
                <Link href={'/signOut'}>
                    Cadastra-se
                </Link>
            </button>
          </div>
        </form>
      </div>
    );
}
