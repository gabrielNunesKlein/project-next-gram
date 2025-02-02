import { getAllPosts } from "@/actions";
import Post from "@/components/Post";
import { auth } from "auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const posts = await getAllPosts()

  const session = await auth()
  let userId = null

  if(session){
    userId = session.user.userId
  }


  return (
    <main className="flex min-h-screen flex-col items-center p-4 my-10">
      <h1 className="text-[2rem] leading-10 font-semibold">
        Confira os posts mais recentes
      </h1>

      <div>
        {posts && posts.length > 0 ? (
          <div className="mt-8">
            {posts.map((post) => (
              <Post 
              key={post.id}
              // @ts-ignore
              post={post} 
              currentUserId={userId} />
            ))}
          </div>
        ) : <p>Ainda não possui posts</p>}
      </div>
    </main>
  );
}
