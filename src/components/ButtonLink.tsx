import Link from 'next/link';
import React from 'react'

type ButtonProps = {
    text: string;
    url: string;
}

export const ButtonLink: React.FC<ButtonProps> = ({ text, url}) => {
    return (
        <Link 
         className="w-fit h-8 bg-blue-800 hover:bg-blue-700 text-sm font-medium text-white py-1 px-6 rounded flex items-center"
        href={url}>
            { text }
        </Link>
    )
}
