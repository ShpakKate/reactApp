import { EntityState } from '@reduxjs/toolkit';
import { CommentItem } from 'entities/Comment';

export interface ArticleDetailsCommentsSchema extends EntityState<CommentItem>{
    isLoading?: boolean;
    error?: string;
    data?: CommentItem[]
}
// export interface ArticleDetailsCommentsSchema {
//     isLoading?: boolean;
//     error?: string;
//     ids?: CommentItem[]
// }
