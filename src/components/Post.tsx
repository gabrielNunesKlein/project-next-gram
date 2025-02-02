"use client"

import Image from "next/image";
import React from "react";
import { Post as PostType } from "types/Post"

interface PostProps {
    post: PostType,
    currentUserId?: string;
}

const Post: React.FC<PostProps> = ({ post, currentUserId }) => {
    return (
        <div className="w-fit-mx-auto mb-6 p-4 border rounded shadow-sm">
            <Image 
                src={post.imageUrl}
                alt={post.caption || ''}
                className="w-[670px] h-[400px] object-cover mb-4 rounded"
                width={670}
                height={400}
            />

            {post.caption && (
                <p className="mb-4 text-sm font-medium">
                    {post.caption}
                </p>
            )}

            <div className="flex items-center">
                {post.user.image && (
                    <Image 
                        src={post.user.image}
                        alt={post.user.name || ''}
                        className="1-10 h-10 object-cover rounded-full mr-3"
                        height={40}
                        width={40}
                    />
                )}
                <p className="text-sm font-medium">
                    {post.user.name}
                </p>
            </div>
            <div className="flex items-center mt-4">ações...</div>
        </div>
    )
}

export default Post;
