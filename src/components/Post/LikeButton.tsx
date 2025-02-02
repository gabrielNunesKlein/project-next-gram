"use client"
import { likePost } from "@/actions"
import { useState } from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs"

interface LikeButtonProps {
    postId: string;
    initialLikeCount: number;
    isLiked: boolean;
    currentUserId: string;
}

export default function LikeButton({ postId, initialLikeCount, isLiked, currentUserId }: LikeButtonProps) {

    const [likeCount, setLikeCount] = useState(initialLikeCount)
    const [liked, setLiked] = useState(isLiked)

  return (
    <div className="flex items-center">
        <button className="mr-2">
            { liked ? <BsFillHeartFill className="w-6 h-6 text-red-500" /> : <BsHeart className="w-6 h-6 text-gray-500" />}
        </button>
        <span>{likeCount}</span>
    </div>
  )
}
