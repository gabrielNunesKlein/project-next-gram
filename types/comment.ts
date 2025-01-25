import { User } from './User';
import { Post } from './Post';

export interface Comment {
    id: string;
    uerId: string;
    postId: string;
    content: string;
    createdAt: Date;
    updatetedAt: Date;
    user: User;
    post?: Post;
}