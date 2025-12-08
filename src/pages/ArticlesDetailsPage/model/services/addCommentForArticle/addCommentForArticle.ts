import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CommentItem } from '@/entities/Comment';
import { getArticleDetailsData } from '@/entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    CommentItem,
    string,
    ThunkConfig<string>
>('articleDetails/sendComment', async (text, thunkAPI) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkAPI;

    const userId = getUserAuthData(getState())?.id;
    const articleId = getArticleDetailsData(getState())?.id;

    if (!userId || !articleId) {
        return rejectWithValue('no data');
    }

    const payload = {
        articleId,
        userId,
        text,
    };

    try {
        const response = await extra.api.post<CommentItem>(
            '/comments',
            payload,
        );

        if (!response.data) {
            throw new Error();
        }

        dispatch(fetchCommentsByArticleId(articleId) as any);

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
