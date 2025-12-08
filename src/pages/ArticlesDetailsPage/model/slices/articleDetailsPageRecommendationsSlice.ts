import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article: Article) => article.id,
});

export const getArticleDetailsRecommendations =
    recommendationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.articleDetailsPage?.recommendations ||
            recommendationsAdapter.getInitialState(),
    );

const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendationsSlice',
    initialState:
        recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
            {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            },
        ),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
                console.log('data =====> 1');
            })
            .addCase(
                fetchArticleRecommendations.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false;
                    recommendationsAdapter.setAll(state, action.payload);

                    console.log('data =====>', action.payload);
                },
            )
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                console.log('data =====> 2');
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: articleDetailsRecommendationsActions } =
    articleDetailsPageRecommendationsSlice;
export const { reducer: articleDetailsRecommendationsReducer } =
    articleDetailsPageRecommendationsSlice;
