import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href={'/client'}>
        Página com client component
      </Link>

      <Link href={'/server'}>
        Página com server component
      </Link>
    </main>
  );
}
