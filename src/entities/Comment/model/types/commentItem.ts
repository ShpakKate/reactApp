import { User } from 'entities/User';

export interface CommentItem {
    id: string;
    user: User;
    text: string;
}
