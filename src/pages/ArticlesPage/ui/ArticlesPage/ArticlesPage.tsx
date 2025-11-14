import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleList, ArticleView } from 'entities/Article';
import { ARTICLE } from 'shared/const/article';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const { t } = useTranslation();
    const list = new Array(16).fill(0).map((item, index) => ({
        ...ARTICLE,
        id: String(index),
    }));

    return (
        <div className={classNames('', {}, [className])}>
            <ArticleList articles={list} view={ArticleView.BIG} isLoading />
        </div>
    );
};

export default memo(ArticlesPage);
