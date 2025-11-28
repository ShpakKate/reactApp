import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { getArticleDetailsData } from '@/entities/Article';

export const getCanEditArticle = createSelector(
    getUserAuthData,
    getArticleDetailsData,
    (user, article) => user?.id === article?.user?.id,
);
