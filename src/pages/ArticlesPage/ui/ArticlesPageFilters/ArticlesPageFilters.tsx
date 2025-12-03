import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    ArticleSortField,
    ArticleType,
    ArticleView,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlePageActions } from '../../model/slices/articlePageSlice';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType, getArticlesPageView,
} from '../../model/selectors/articlePageSelectors';
import cls from './ArticlesPageFilters.module.scss';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const sort = useSelector(getArticlesPageSort);
    const order = useSelector(getArticlesPageOrder);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);
    const view = useSelector(getArticlesPageView);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setPage(1));
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 500);

    const onChangeSort = useCallback((view: ArticleSortField) => {
        dispatch(articlePageActions.setSort(view));
        fetchData();
    }, [fetchData, dispatch]);

    const onChangeOrder = useCallback((view: SortOrder) => {
        dispatch(articlePageActions.setOrder(view));
        fetchData();
    }, [fetchData, dispatch]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlePageActions.setSearch(search));
        debounceFetchData();
    }, [debounceFetchData, dispatch]);

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlePageActions.setType(value));
        fetchData();
    }, [fetchData, dispatch]);

    return (
        <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input
                    placeholder={t('Поиск')}
                    value={search}
                    onChange={onChangeSearch}
                />
            </Card>
            <ArticleTypeTabs className={cls.tabs} value={type} onChangeType={onChangeType} />
        </div>
    );
});
