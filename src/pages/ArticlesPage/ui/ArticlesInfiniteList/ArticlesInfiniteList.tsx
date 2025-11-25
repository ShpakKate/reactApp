import { memo } from 'react';
import { ArticleList } from 'entities/Article';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { getArticles } from '../../../ArticlesPage/model/slices/articlePageSlice';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../../ArticlesPage/model/selectors/articlePageSelectors';

interface ArticlesInfiniteListProps {
    className?: string;
}

export const ArticlesInfiniteList = memo((props: ArticlesInfiniteListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const view = useSelector(getArticlesPageView);
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);

    if (error) {
        return <Text text={t('Ошибка при загрузке статей')} />;
    }

    return (
        <ArticleList className={className} articles={articles} view={view} isLoading={isLoading} />
    );
});
