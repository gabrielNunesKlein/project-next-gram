import { getUsaersPosts } from '@/actions'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React from 'react'

const MyPostsPage: React.FC = async () => {

    const session = await auth()

    let userId = null

    if(session){
        userId = session.user.userId
    } else {
        redirect("/")
    }

    const posts = await getUsaersPosts(userId)

    return (
        <div>
            {posts.map((post) => (
                <p>{post.caption}</p>
            ))}
        </div>
    )
}

export default MyPostsPage;