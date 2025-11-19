import { ThunkConfig } from 'app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article';
import { getArticlesPageInited } from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../../services/fetchArticlesList/fetchArticlesList';

type ArticlePageActionKeys = keyof typeof articlePageActions;

interface UrlParamConfig {
    key: string;
    method: ArticlePageActionKeys;
}

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    'articlePage/initArticlesPage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi;

        const inited = getArticlesPageInited(getState());

        if (!inited) {
            const methods: UrlParamConfig[] = [
                { key: 'order', method: 'setOrder' },
                { key: 'sort', method: 'setSort' },
                { key: 'search', method: 'setSearch' },
            ];

            methods.forEach((method) => {
                const paramFromUrl = searchParams.get(method.key);

                if (paramFromUrl) {
                    switch (method.method) {
                    case 'setOrder':
                        if (paramFromUrl === 'asc' || paramFromUrl === 'desc') {
                            dispatch(articlePageActions.setOrder(paramFromUrl as SortOrder));
                        }
                        break;
                    case 'setSort':
                        if (Object.values(ArticleSortField).includes(paramFromUrl as ArticleSortField)) {
                            dispatch(articlePageActions.setSort(paramFromUrl as ArticleSortField));
                        }
                        break;
                    case 'setSearch':
                        dispatch(articlePageActions.setSearch(paramFromUrl));
                        break;
                    default: break;
                    }
                }
            });

            dispatch(articlePageActions.initState());
            dispatch(fetchArticlesList({}) as any);
        }
    },
);
