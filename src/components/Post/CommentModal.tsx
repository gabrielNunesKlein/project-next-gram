"use client"

import { useState } from "react"
import Modal from "react-modal"
import { Post  as PostType} from "types/Post"

interface CommentModalProps {
    post: PostType;
    currentUserId?: string;
    isOpen: boolean;
    onRequestClose: () => void;
}

export default function CommentModal({ post, currentUserId, isOpen, onRequestClose }: CommentModalProps) {

    const [comment, setComment] = useState("")
  return (
    <Modal 
        className={"w-[704px] mx-auto bg-white rounded border border-zinc-300"}
        isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Comentarios" ariaHideApp={false}>
            <p>Conteudo</p>
    </Modal>
  )
}
