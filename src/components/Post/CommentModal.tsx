"use client"

import { useState } from "react"
import Modal from "react-modal"
import { Post  as PostType} from "types/Post"
import { Button } from "../Button";
import { FlashMessage } from "../FlashMessage";
import { addComment } from "@/actions";

interface CommentModalProps {
    post: PostType;
    currentUserId?: string;
    isOpen: boolean;
    onRequestClose: () => void;
}

export default function CommentModal({ post, currentUserId, isOpen, onRequestClose }: CommentModalProps) {

    const [content, setContent] = useState("")
    const [flashMenssage, setFlashMenssage] = useState<{
        message: string,
        type: "error" | "success"
    } | null>(null)

    const handleAddComment = async() => {
        if(!currentUserId){
            window.location.href = "/"
            return
        }

        if(!content.trim()){
            setFlashMenssage({
                message: "O comentario não pode estar vazio",
                type: "error"
            })

            return
        }

        await addComment(post.id, currentUserId, content)
        setFlashMenssage({
            message: "Comentario adicionado com sucesso.",
            type: "success"
        })

        setContent("")

    }
  return (
    <Modal 
        className={"w-[704px] mx-auto bg-white rounded border border-zinc-300"}
        isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Comentarios" ariaHideApp={false}>
            {flashMenssage && (
                <FlashMessage message={flashMenssage.message} type={flashMenssage.type} />
            )}
            <p>Conteudo</p>
            <div className="mb-4 flex flex-col gap-6">
                <textarea 
                    className="w-full h-32 p-2 border-zinc-300 rounded text-sm font-medium"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Adicione um comentario"
                ></textarea>
                <div className="fl justify-end">
                    <Button type="button" text="comentar" onClick={handleAddComment} />
                </div>
            </div>
    </Modal>
  )
}
