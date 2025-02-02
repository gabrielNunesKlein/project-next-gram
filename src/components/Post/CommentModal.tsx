"use client"

import { useState } from "react"
import Modal from "react-modal"
import { Post  as PostType} from "types/Post"
import { Button } from "../Button";
import { FlashMessage } from "../FlashMessage";
import { addComment } from "@/actions";
import { GrClose } from "react-icons/gr";
import Image from "next/image";

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
        className={"w-[704px] mt-28 mx-auto bg-white rounded border border-zinc-300"}
        isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Comentarios" ariaHideApp={false}>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold mb-4">
                        Comentários
                    </h2>
                    <button className="bg-red-600 hover:bg-red-400 text-white p-2 rounded-full" onClick={onRequestClose}>
                        <GrClose />
                    </button>
                </div>
                {flashMenssage && (
                    <FlashMessage message={flashMenssage.message} type={flashMenssage.type} />
                )}
                <div className="div mb-4 flex flex-col">
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <div className="flex items-center mb-4" key={comment.id}>
                                <Image 
                                    src={comment.user.image || ''}
                                    alt={`Imagem do usuário`}
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 object-cover rounded-full mr-3"
                                />
                                <p className="text-sm">
                                    <strong>{comment.user.name}</strong> {comment.content}
                                </p>
                            </div>
                        ))
                    ) : ( <p>Nenhum comentário ainda...</p> )}
                </div>
                <div className="mb-4 flex flex-col gap-6">
                    <textarea 
                        className="w-full h-32 p-2 border border-zinc-300 rounded text-sm font-medium"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Adicione um comentario"
                    ></textarea>
                    <div className="fl justify-end">
                        <Button type="button" text="comentar" onClick={handleAddComment} />
                    </div>
                </div>
            </div>
    </Modal>
  )
}
